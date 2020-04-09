import { Injectable } from '@angular/core';
import { DailyRecord } from '../classes/daily-record';
import { StorageService } from './storage.service';
import { map, take, mergeMap, toArray, switchMap, tap } from 'rxjs/operators';
import { UserData } from '../interfaces/user-data';
import { formatDate } from '@angular/common';
import { Subject, BehaviorSubject, from, forkJoin, of, Observable } from 'rxjs';
import { Record } from '../interfaces/record';

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
        console.log('user data created');
        this.loadDailyRecords().subscribe();
      });
  }

  getLatestRecord() {
    return this.storageService.recordMetaList$
      .pipe(
        map(recordMetaList => recordMetaList[recordMetaList.length - 1]),
        switchMap(recordMeta => this.storageService.getRecord(recordMeta)),
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
    const recordZero = records.sort((a, b) => +b.timestamp - +a.timestamp)[0];
    const DayOne = formatDate(recordZero.timestamp, 'yyyy-MM-dd', 'en-us');
    dailyRecords.forEach((dailyRecord, idx) => {
      dailyRecord.date = this.dateDelta(DayOne, idx);
      dailyRecords[idx] = dailyRecord;
    });
    return dailyRecords;
  }

  loadDailyRecords(): Observable<Record[]> {
    let dailyRecords = this.newDailyRecords();
    return this.storageService.recordMetaList$
      .pipe(
        mergeMap(recordMetaList => {
          return forkJoin(
            recordMetaList.map(recordMeta => this.storageService.getRecord(recordMeta))
          );
        }),
        tap(records => dailyRecords = this.initDailyRecordDates(dailyRecords, records)),
        mergeMap(records => {
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
          dailyRecords.forEach(dailyRecord => {
            dailyRecord.records = dailyRecord.records.sort((a, b) => +a.timestamp - +b.timestamp);
          });
          this.dailyRecords.next(dailyRecords);
          console.log('update dailyrecord', dailyRecords);
        })
      );
  }

  private getCountdown(currentDate: string) {
    const start = new Date(this.storageService.getUserData().startDate).getTime();
    const current = new Date(currentDate).getTime();
    console.log('start current', start, current);
    return Math.floor((current - start) / (1000 * 60 * 60 * 24));
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
