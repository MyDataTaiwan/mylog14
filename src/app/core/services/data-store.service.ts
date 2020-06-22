import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { DailyRecords } from '../classes/daily-records';
import { OverviewDailyCard } from '../classes/overview-daily-card';
import { RecordMeta } from '../interfaces/record-meta';
import { UserData } from '../interfaces/user-data';
import { RecordService } from './record.service';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private readonly recordMetas = new BehaviorSubject<RecordMeta[]>([]);
  public recordMetas$ = this.recordMetas.asObservable();

  public dailyRecords$ = this.recordMetas$.pipe(
    map(recordMetas => (recordMetas) ? recordMetas : []),
    switchMap(recordMetas => this.recordService.getRecords(recordMetas)),
    map(records => new DailyRecords(records)),
    switchMap(dailyRecords => {
      const userData = this.userData;
      userData.startDate = dailyRecords.startDate;
      userData.endDate = dailyRecords.endDate;
      return forkJoin([this.updateUserData(userData), of(dailyRecords)]);
    }),
    map(([_, dailyRecords]) => dailyRecords),
    tap(d => console.log('Daily records', d)),
  );

  public overviewCards$ = this.dailyRecords$.pipe(
    map(dailyRecords => {
      return dailyRecords.list
        .map(dailyRecord => new OverviewDailyCard(dailyRecord))
        .filter(card => card.hasData === true);
    }),
  );

  private userData: UserData = this.userDataService.defaultUserData;
  public userData$ = new BehaviorSubject<UserData>(this.userDataService.defaultUserData);

  constructor(
    private readonly recordService: RecordService,
    private readonly userDataService: UserDataService,
  ) {
    this.userData$
      .pipe(tap(userData => this.userData = userData))
      .subscribe();
  }

  initialize() {
    return forkJoin([this.updateUserData(), this.updateRecordMetas()]);
  }

  getUserData() {
    return this.userData;
  }

  updateRecordMetas(recordMetas?: RecordMeta[]): Observable<RecordMeta[]> {
    const loadList$ = this.recordService.getRecordMetas();
    const saveList$ = this.recordService.saveRecordMetas(recordMetas);
    const update$ = (recordMetas) ? saveList$ : loadList$;
    return update$.pipe(
      tap((list: RecordMeta[]) => this.recordMetas.next(list)),
    );
  }

  updateUserData(userData?: UserData): Observable<UserData> {
    const load$ = this.userDataService.getUserData();
    const save$ = this.userDataService.saveUserData(userData);
    const update$ = (userData) ? save$ : load$;
    return update$.pipe(
      map((data: UserData) => {
        if (data.defaultSchema === undefined) {
          data.defaultSchema = true;
        }
        return data;
      }),
      tap(data => this.userData$.next(data)),
    );
  }

}
