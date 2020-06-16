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
  private recordMetas = new BehaviorSubject<RecordMeta[]>([]);
  public recordMetas$ = this.recordMetas.asObservable();

  public dailyRecords$ = this.recordMetas$.pipe(
    map(recordMetas => (recordMetas) ? recordMetas : []),
    switchMap(recordMetas => this.recordService.getRecords(recordMetas)),
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

  public dailydrips$ = this.recordMetas$.pipe(
    map(recordMetas => (recordMetas) ? recordMetas : []),
    switchMap(recordMetas => this.recordService.getRecords(recordMetas)),
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
    private recordService: RecordService,
    private userDataService: UserDataService,
  ) {
    this.updateRecordMetas().subscribe(); // Initial update (load from storage)
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
      tap((data: UserData) => this.userData.next(data)),
    );
  }

}
