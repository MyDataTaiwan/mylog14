import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';

import { RecordsByDate } from '@core/interfaces/records-by-date';

import { Record } from '../../classes/record';
import { UserData } from '../../interfaces/user-data';
import { RecordPreset } from '../preset.service';
import {
  RecordRepositoryService,
} from '../repository/record-repository.service';
import {
  UserDataRepositoryService,
} from '../repository/user-data-repository.service';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  private readonly initialized = new BehaviorSubject<boolean>(false);
  public initialized$: Observable<boolean> = this.initialized;

  private readonly records = new BehaviorSubject<Record[]>([]);
  public records$: Observable<Record[]> = this.records;

  private readonly userData = new BehaviorSubject<UserData>({
    firstName: '', lastName: '', recordPreset: RecordPreset.COMMON_COLD, newUser: true,
  });
  public userData$: Observable<UserData> = this.userData;

  public recordsByDate$: Observable<RecordsByDate> = this.records$
    .pipe(
      map(records => this.getRecordsByDate(records)),
    );


  constructor(
    private readonly recordRepo: RecordRepositoryService,
    private readonly userDataRepo: UserDataRepositoryService,
  ) {
    this.initializeStore()
      .subscribe(() => this.initialized.next(true));
  }

  pushRecord(record: Record): Observable<Record[]> {
    return this.recordRepo.save(record)
      .pipe(
        tap(newRecords => this.records.next(newRecords)),
      );
  }

  createOrReplaceUserData(userData: UserData): Observable<UserData> {
    return this.userDataRepo.save(userData)
      .pipe(
        tap(newUserData => this.userData.next(newUserData)),
      );
  }

  updateUserData(data: {}): Observable<UserData> {
    return this.userDataRepo.get()
      .pipe(
        map(userData => ({ ...userData, ...data })),
        switchMap(newUserData => this.userDataRepo.save(newUserData)),
        tap(newUserData => this.userData.next(newUserData)),
      );
  }

  private initializeStore(): Observable<[UserData, Record[]]> {
    const initUserData$ = this.userDataRepo.get()
      .pipe(
        tap(userData => this.userData.next(userData))
      );
    const initRecords$ = this.recordRepo.getAll()
      .pipe(
        tap(records => this.records.next(records))
      );
    return forkJoin([initUserData$, initRecords$]).pipe(first());
  }

  private getRecordsByDate(records: Record[]): RecordsByDate {
    const initialDateGroups: RecordsByDate = {};
    return records.reduce<{}>((dateGroups: RecordsByDate, record) => {
      const date = formatDate(record.timestamp, 'yyyy-MM-dd', 'en-us');
      if (!dateGroups[date]) {
        dateGroups[date] = [];
      }
      dateGroups[date].push(record);
      return dateGroups;
    }, initialDateGroups);
  }

}
