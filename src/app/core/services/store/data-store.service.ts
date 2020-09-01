import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

import { BehaviorSubject, concat, forkJoin, Observable } from 'rxjs';
import { map, switchMap, tap, toArray } from 'rxjs/operators';

import { RecordFieldType } from '@core/enums/record-field-type.enum';
import { DailySummary } from '@core/interfaces/daily-summary';
import { RecordsByDate } from '@core/interfaces/records-by-date';
import { SharedLink } from '@core/interfaces/shared-link';
import { SummaryByDate } from '@core/interfaces/summary-by-date';

import { Record } from '../../classes/record';
import { KeyData } from '../../interfaces/key-data';
import { UserData } from '../../interfaces/user-data';
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

  private readonly records = new BehaviorSubject<Record[]>([]);
  records$: Observable<Record[]> = this.records
    .pipe(
      map(records => records.filter(record => (record.templateName))),
    );

  private readonly userData = new BehaviorSubject<UserData>(this.userDataRepo.defaultUserData);
  userData$: Observable<UserData> = this.userData;

  recordsByDate$: Observable<RecordsByDate> = this.records$
    .pipe(
      map(records => records.filter(record => record.templateName === this.userData.getValue().dataTemplateName)),
      map(records => this.getRecordsByDate(records)),
    );

  summaryByDate$: Observable<SummaryByDate> = this.recordsByDate$
    .pipe(
      map(recordsByDate => this.getSummaryByDate(recordsByDate)),
    );

  constructor(
    private readonly recordRepo: RecordRepositoryService,
    private readonly userDataRepo: UserDataRepositoryService,
  ) {
  }

  deleteRecord(record: Record): Observable<Record[]> {
    return this.recordRepo.delete(record)
      .pipe(
        tap(records => this.records.next(records)),
      );
  }

  deleteAllRecords(): Observable<any> {
    const deleteRecord$ = this.records.getValue().map(record => this.recordRepo.delete(record));
    return concat(...deleteRecord$)
      .pipe(
        toArray(),
        tap(() => this.records.next([])),
      );
  }

  pushRecord(record: Record, register = true): Observable<Record[]> {
    return this.recordRepo.save(record, register)
      .pipe(
        tap(records => this.records.next(records)),
      );
  }

  pushSharedLink(sharedLink: SharedLink): Observable<UserData> {
    return this.userDataRepo.get()
      .pipe(
        map(userData => {
          if (!userData.sharedLinks) {
            userData.sharedLinks = [];
          }
          userData.sharedLinks.push(sharedLink);
          return userData;
        }),
        switchMap(newUserData => this.userDataRepo.save(newUserData)),
        tap(newUserData => this.userData.next(newUserData)),
      );
  }

  createOrReplaceUserData(userData: UserData): Observable<UserData> {
    return this.userDataRepo.save(userData)
      .pipe(
        tap(newUserData => this.userData.next(newUserData)),
      );
  }

  flushRecord(): Observable<any> {
    return this.recordRepo.getAll()
      .pipe(
        tap(records => this.records.next(records)),
      );
  }

  deleteUserData(): Observable<UserData> {
    return this.userDataRepo.resetToDefault()
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

  initialize(): Observable<[UserData, Record[]]> {
    const initUserData$ = this.userDataRepo.get()
      .pipe(
        tap(userData => this.userData.next(userData)),
      );
    const initRecords$ = this.recordRepo.getAll()
      .pipe(
        tap(records => this.records.next(records)),
      );
    return forkJoin([initUserData$, initRecords$]);
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

  private getSummaryByDate(recordsByDate: RecordsByDate) {
    const summaryByDate: SummaryByDate = {};
    let firstDate = null;
    Object.keys(recordsByDate).forEach(key => {
      if (!firstDate) {
        firstDate = key;
      }
      summaryByDate[key] = this.getDailySummary(recordsByDate[key], this.getDateDiff(firstDate, key) + 1, key);
    });
    return summaryByDate;
  }

  private getDailySummary(records: Record[], dayCount: number, date: string): DailySummary {
    if (records.length === 0) {
      return null;
    }
    const dailySummary: DailySummary = {
      dayCount,
      date,
      recordsCount: records.length,
      templateName: records[0].templateName,
      keyData: this.getKeyData(records),
      imgByteString: this.getLatestPhoto(records),
    };
    return dailySummary;
  }

  private getDateDiff(startDate: string, endDate: string): number {
    const start = (new Date(startDate)).getTime();
    const end = (new Date(endDate)).getTime();
    return Math.floor((end - start) / (1000 * 3600 * 24));
  }

  // WORKAROUND: prior to v0.12.3, records don't have keyFieldName
  getKeyFieldName(record: Record): string {
    if (!record.keyFieldName) {
      const keyFieldReference = {
        commonCold: 'bodyTemperature',
        heartFailure: 'SBP',
        healthDeclaration: 'bodyTemperature',
      };
      return keyFieldReference[record.templateName];
    }
    return record.keyFieldName;
  }

  private getKeyData(records: Record[]): KeyData {
    const keyData: KeyData = {
      dataClass: null,
      name: null,
      value: null,
      unit: null,
    };
    records.forEach(record => {
      const keyField = record.fields.find(field => field.name === this.getKeyFieldName(record));
      if (!keyData.dataClass) {
        keyData.dataClass = keyField.dataClass;
        keyData.name = keyField.name;
        keyData.unit = keyField.valueUnit;
      }
      if (keyField.value === null) {
        return;
      }
      if (keyData.value === null) {
        keyData.value = +keyField.value;
      } else if (keyField.dataClass === 'lowest' && keyData.value > keyField.value) {
        keyData.value = +keyField.value;
      } else if (keyField.dataClass === 'highest' && keyData.value < keyField.value) {
        keyData.value = +keyField.value;
      } else if (keyField.dataClass === 'accumulated') {
        keyData.value += +keyField.value;
      }
    });
    return keyData;
  }

  private getLatestPhoto(records: Record[]): string {
    const reversedRecords = records.reverse();
    const recordWithPhoto = reversedRecords.find(record =>
      record.fields.find(field =>
        field.type === RecordFieldType.photo && field.value
      )
    );
    if (recordWithPhoto) {
      return recordWithPhoto.fields.find(field => field.type === RecordFieldType.photo && field.value).value as string;
    } else {
      return null;
    }
  }

}
