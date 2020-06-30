import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { DailyRecords } from '../classes/daily-records';
import { OverviewDailyCard } from '../classes/overview-daily-card';
import { Meta } from '../interfaces/meta';
import { UserData } from '../interfaces/user-data';
import { RecordService } from './record.service';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private readonly metas = new BehaviorSubject<Meta[]>([]);
  public metas$ = this.metas.asObservable();

  public dailyRecords$ = this.metas$.pipe(
    map(metas => (metas) ? metas : []),
    switchMap(metas => this.recordService.getRecords(metas)),
    map(records => new DailyRecords([])),
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
    return forkJoin([this.updateUserData(), this.updateMetas()]);
  }

  getUserData() {
    return this.userData;
  }

  updateMetas(metas?: Meta[]): Observable<Meta[]> {
    const loadList$ = this.recordService.getMetas();
    const saveList$ = this.recordService.saveMetas(metas);
    const update$ = (metas) ? saveList$ : loadList$;
    return update$.pipe(
      tap((list: Meta[]) => this.metas.next(list)),
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
