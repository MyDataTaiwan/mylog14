import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { RecordMeta } from '../classes/record-meta';
import { LocalStorageService } from './local-storage.service';
import { tap, map, switchMap } from 'rxjs/operators';
import { DailyRecord } from '../classes/daily-record';
import { Record } from '../interfaces/record';
import { DatetimeService } from './datetime.service';
import { DailyRecords } from '../classes/daily-records';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private recordMetaList = new BehaviorSubject<RecordMeta[]>([]);
  public recordMetaList$ = this.recordMetaList.asObservable();

  private dailyRecords = new BehaviorSubject<DailyRecords>(new DailyRecords());
  public dailyRecords$ = this.dailyRecords.asObservable();


  constructor(
    private localStorage: LocalStorageService,
  ) { }

  updateDailyRecords(dailyRecords?: DailyRecords): Observable<DailyRecords> {
    const loadList$ = this.loadDailyRecords();
    const saveList$ = of(dailyRecords);
    const update$ = (dailyRecords) ? saveList$ : loadList$;
    return update$.pipe(
      (tap((dr: DailyRecords) => this.dailyRecords.next(dr))),
    );
  }

  updateRecordMetaList(recordMetaList?: RecordMeta[]): Observable<RecordMeta[]> {
    const loadList$ = this.localStorage.getRecordMetaList();
    const saveList$ = this.localStorage.saveRecordMetaList(recordMetaList);
    const update$ = (recordMetaList) ? saveList$ : loadList$;
    return update$.pipe(
      (tap((list: RecordMeta[]) => this.recordMetaList.next(list))),
    );
  }

  private loadDailyRecords(): Observable<DailyRecords> {
    return this.localStorage.getRecordMetaList()
      .pipe(
        switchMap(recordMetaList => this.localStorage.getRecords(recordMetaList)),
        map(records => new DailyRecords(records)),
      );
  }

}
