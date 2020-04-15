import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { RecordMeta } from '../classes/record-meta';
import { LocalStorageService } from './local-storage.service';
import { tap, map, switchMap } from 'rxjs/operators';
import { DailyRecords } from '../classes/daily-records';
import { OverviewDailyCard } from '../classes/overview-daily-card';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private recordMetaList = new BehaviorSubject<RecordMeta[]>([]);
  public recordMetaList$ = this.recordMetaList.asObservable();

  public dailyRecords$ = this.recordMetaList$.pipe(
    map(recordMetaList => (recordMetaList) ? recordMetaList : []),
    switchMap(recordMetaList => this.localStorage.getRecords(recordMetaList)),
    map(records => new DailyRecords(records)),
  );

  public overviewCards$ = this.dailyRecords$.pipe(
    map(dailyRecords => {
      return dailyRecords.list
        .map(dailyRecord => new OverviewDailyCard(dailyRecord))
        .filter(card => card.hasData === true);
    }),
  );

  constructor(
    private localStorage: LocalStorageService,
  ) {
    this.updateRecordMetaList().subscribe(); // Initial update (load from storage)
  }

  updateRecordMetaList(recordMetaList?: RecordMeta[]): Observable<RecordMeta[]> {
    const loadList$ = this.localStorage.getRecordMetaList();
    const saveList$ = this.localStorage.saveRecordMetaList(recordMetaList);
    const update$ = (recordMetaList) ? saveList$ : loadList$;
    return update$.pipe(
      (tap((list: RecordMeta[]) => this.recordMetaList.next(list))),
    );
  }

}
