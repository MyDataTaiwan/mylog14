import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { DailyRecords } from '../classes/daily-records';
import { OverviewDailyCard } from '../classes/overview-daily-card';
import { RecordMeta } from '../interfaces/record-meta';
import { UserData } from '../interfaces/user-data';
import { LocalStorageService } from './local-storage.service';
import { RecordService } from './record.service';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private recordMetaList = new BehaviorSubject<RecordMeta[]>([]);
  public recordMetaList$ = this.recordMetaList.asObservable();

  public dailyRecords$ = this.recordMetaList$.pipe(
    map(recordMetaList => (recordMetaList) ? recordMetaList : []),
    switchMap(recordMetaList => this.recordService.getRecords(recordMetaList)),
    map(records => new DailyRecords(records)),
    switchMap(dailyRecords => {
      const userData = this.userData.getValue();
      userData.startDate = dailyRecords.startDate;
      userData.endDate = dailyRecords.endDate;
      return forkJoin([this.updateUserData(userData), of(dailyRecords)]);
    }),
    map(([_, dailyRecords]) => dailyRecords),
    tap(d => console.log('Daily records', d)),
  );

  public dailydrips$ = this.recordMetaList$.pipe(
    map(recordMetaList => (recordMetaList) ? recordMetaList : []),
    switchMap(recordMetaList => this.recordService.getRecords(recordMetaList)),
    map(records => records.length),
  );

  public overviewCards$ = this.dailyRecords$.pipe(
    map(dailyRecords => {
      return dailyRecords.list
        .map(dailyRecord => new OverviewDailyCard(dailyRecord))
        .filter(card => card.hasData === true);
    }),
  );

  private userData = new BehaviorSubject<UserData>({
    firstName: '',
    lastName: '',
    newUser: true,
    eulaAccepted: false,
    guideAccepted: false
  });
  public userData$ = this.userData.asObservable();

  constructor(
    private localStorage: LocalStorageService,
    private recordService: RecordService,
    private userDataService: UserDataService,
  ) {
    this.updateRecordMetas().subscribe(); // Initial update (load from storage)
  }

  updateRecordMetas(recordMetaList?: RecordMeta[]): Observable<RecordMeta[]> {
    const loadList$ = this.recordService.getRecordMetas();
    const saveList$ = this.recordService.saveRecordMetas(recordMetaList);
    const update$ = (recordMetaList) ? saveList$ : loadList$;
    return update$.pipe(
      tap((list: RecordMeta[]) => this.recordMetaList.next(list)),
    );
  }

  updateUserData(userData?: UserData): Observable<UserData> {
    const load$ = this.userDataService.getUserData();
    const save$ = this.userDataService.saveUserData(userData);
    const update$ = (userData) ? save$ : load$;
    return update$.pipe(
      tap((data: UserData) => this.userData.next(data)),
    );
  }

}
