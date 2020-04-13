import { Injectable } from '@angular/core';
import { DailyRecord } from '../classes/daily-record';
import { StorageService } from './storage.service';
import { map, take, mergeMap, toArray, switchMap, tap, defaultIfEmpty, catchError, takeWhile } from 'rxjs/operators';
import { UserData } from '../interfaces/user-data';
import { formatDate } from '@angular/common';
import { Subject, BehaviorSubject, from, forkJoin, of, Observable, throwError } from 'rxjs';
import { Record } from '../interfaces/record';
import { Symptoms } from '../classes/symptoms';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private dailyRecords = new BehaviorSubject<DailyRecord[]>([]);
  public dailyRecords$ = this.dailyRecords.asObservable();
  public dailyRecordToday$ = this.dailyRecords.asObservable()
    .pipe(
      switchMap(dailyRecords => this.getDailyRecordToday(dailyRecords)),
    );

  constructor(
    private storageService: StorageService,
  ) {
    forkJoin([
      this.storageService.loadRecordMetaList(),
      this.createDummyUserData(),
    ])
      .subscribe(() => {
        console.log('Record service constructor: forkJoin [loadRecordMetaList, createDummyUserData] finished');
        console.log('Record service constructor: start subscribing loadDailyRecords');
        this.loadDailyRecords().subscribe();
      });
  }

  // FIXME: This doesn't have to be an Observable, just fix it later
  newRecord() {
    const newRecord: Record = {
      timestamp: (new Date()).getTime().toString(),
      symptoms: new Symptoms(),
      photos: [],
    };
    return of(newRecord);
  }

  getLatestRecord() {
    return this.storageService.recordMetaList$
      .pipe(
        take(1),
        map(recordMetaList => recordMetaList[recordMetaList.length - 1]),
        switchMap(recordMeta => {
          if (recordMeta) {
            return this.storageService.getRecord(recordMeta);
          } else {
            const newRecord: Record = {
              timestamp: null,
              symptoms: new Symptoms(),
              photos: [],
            };
            return of(newRecord);
          }
        }),
      );
  }

  getDailyRecordToday(dailyRecords: DailyRecord[]) {
    const today = formatDate(Date.now(), 'yyyy-MM-dd', 'en-us');
    return of(dailyRecords.find(dailyRecord => dailyRecord.date === today));
  }

  createDummyUserData(): Observable<void> {
    const userData: UserData = {
      uuid: '<uuid-placeholder>',
      language: 'zh-TW',
      timezone: '+0800',
      startDate: null,
      endDate: null,
    };
    return this.storageService.saveUserData(userData);
  }

  updateUserDataDate(timestamp: string): Observable<void> {
    const userData = this.storageService.getUserData();
    userData.startDate = formatDate(timestamp, 'yyyy-MM-dd', 'en-us');
    userData.endDate = this.dateDelta(userData.startDate, 14);
    return this.storageService.saveUserData(userData);
  }

  newDailyRecords(): DailyRecord[] {
    const DAY_LENGTH = 14;
    const dailyRecords: DailyRecord[] = new Array(DAY_LENGTH);
    for (let i = 0; i < DAY_LENGTH; i ++) {
      dailyRecords[i] = new DailyRecord(i + 1);
    }
    return dailyRecords;
  }

  initDailyRecordDates(dailyRecords: DailyRecord[], records: Record[]): DailyRecord[] {
    console.log('Record service: initDailyRecordDates => dailyRecords', dailyRecords);
    const recordZero = records.sort((a, b) => +a.timestamp - +b.timestamp)[0];
    const DayOne = formatDate(recordZero.timestamp, 'yyyy-MM-dd', 'en-us');
    dailyRecords.forEach((dailyRecord, idx) => {
      dailyRecord.date = this.dateDelta(DayOne, idx);
      dailyRecords[idx] = dailyRecord;
    });
    return dailyRecords;
  }

  createDailyRecords(records: Record[]) {
    let dailyRecords: DailyRecord[] = this.newDailyRecords();
    dailyRecords = this.initDailyRecordDates(dailyRecords, records);
    records.forEach(record => {
      const recordOnDate = dailyRecords.find(dailyRecord => dailyRecord.date === this.formatDate(record.timestamp));
      if (recordOnDate) {
        dailyRecords[dailyRecords.indexOf(recordOnDate)].records.push(record);
      }
    });
    dailyRecords.forEach(dailyRecord => {
      dailyRecord.records = dailyRecord.records.sort((a, b) => +a.timestamp - +b.timestamp);
    });
    console.log('DAAAAAAA', dailyRecords);
    return dailyRecords;
  }

  loadDailyRecords(): Observable<DailyRecord[]> {
    return this.storageService.recordMetaList$
      .pipe(
        switchMap(recordMetaList => this.storageService.getRecords(recordMetaList)),
        map(records => this.createDailyRecords(records)),
        tap(dailyRecords => this.dailyRecords.next(dailyRecords)),
      );
      /*
    let dailyRecords = this.newDailyRecords();
    return this.storageService.recordMetaList$
      .pipe(
        mergeMap(recordMetaList => {
          console.log('Record service: loadDailyRecords => recordMetaList', recordMetaList);
          return forkJoin(
            recordMetaList.map(recordMeta => this.storageService.getRecord(recordMeta))
          );
        }),
        tap(records => dailyRecords = this.initDailyRecordDates(dailyRecords, records)),
        mergeMap(records => {
          console.log('Record service: loadDailyRecords => records', records);
          console.log('Record service: loadDailyRecords => dailyRecords', dailyRecords);
          return forkJoin(
            records.map(record => {
              dailyRecords.some(dailyRecord => {
                if (this.formatDate(record.timestamp) === dailyRecord.date) {
                  dailyRecord.records.push(record);
                  return true;
                }
              });
              return of(record);
            })
          );
        }),
        tap(() => {
          console.log('Record service: loadDailyRecords => pushed dailyRecords', dailyRecords);
          dailyRecords.forEach(dailyRecord => {
            dailyRecord.records = dailyRecord.records.sort((a, b) => +a.timestamp - +b.timestamp);
          });
          this.dailyRecords.next(dailyRecords);
        }),
      );
      */
  }

  private dateDelta(dateString: string, delta: number) {
    const date = new Date(dateString);
    const epochTime = date.setDate(date.getDate() + delta);
    return this.formatDate(epochTime);
  }

  private formatDate(time: string | number | Date) {
    return formatDate(time, 'yyyy-MM-dd', 'en-us');
  }

}
