import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { DailyRecords } from '../classes/daily-records';
import { OverviewDailyCard } from '../classes/overview-daily-card';
import { Meta } from '../interfaces/meta';
import { UserData } from '../interfaces/user-data';
import { RecordRepositoryService } from './repository/record-repository.service';
import { UserDataRepositoryService } from './repository/user-data-repository.service';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private readonly metas = new BehaviorSubject<Meta[]>([]);
  public metas$ = this.metas.asObservable();

  public dailyRecords$ = this.metas$.pipe(
    map(metas => (metas) ? metas : []),
    switchMap(metas => this.recordRepository.getRecords(metas)),
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

  private userData: UserData = this.userDataRepository.defaultUserData;
  public userData$ = new BehaviorSubject<UserData>(this.userDataRepository.defaultUserData);

  constructor(
    private readonly recordRepository: RecordRepositoryService,
    private readonly userDataRepository: UserDataRepositoryService,
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
    const loadList$ = this.recordRepository.getMetas();
    const saveList$ = this.recordRepository.saveMetas(metas);
    const update$ = (metas) ? saveList$ : loadList$;
    return update$.pipe(
      tap((list: Meta[]) => this.metas.next(list)),
    );
  }

  updateUserData(userData?: UserData): Observable<UserData> {
    const load$ = this.userDataRepository.getUserData();
    const save$ = this.userDataRepository.saveUserData(userData);
    const update$ = (userData) ? save$ : load$;
    return update$.pipe(
      tap(data => this.userData$.next(data)),
    );
  }

}
