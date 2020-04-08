import { Injectable } from '@angular/core';
import { DailyRecord } from '../interfaces/daily-record';
import { StorageService } from './storage.service';
import { map, take, mergeMap, toArray, switchMap, tap } from 'rxjs/operators';
import { UserData } from '../interfaces/user-data';
import { formatDate } from '@angular/common';
import { Subject, BehaviorSubject, from, forkJoin, of } from 'rxjs';
import { Record } from '../interfaces/record';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private dailyRecords = new BehaviorSubject<DailyRecord[]>([]);
  public dailyRecords$ = this.dailyRecords.asObservable();
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

  createDummyUserData() {
    const dateToday = new Date();
    const dateStart = this.formatDate(dateToday.setDate(dateToday.getDate() - 5));
    const dateEnd = this.formatDate(dateToday.setDate(dateToday.getDate() + 14));
    const userData: UserData = {
      uuid: '<uuid-placeholder>',
      language: 'zh-TW',
      timezone: '+0800',
      startDate: dateStart,
      endDate: dateEnd,
    };
    return this.storageService.saveUserData(userData);
  }

  loadDailyRecords() {
    const dailyRecords: DailyRecord[] = new Array(14);
    return this.storageService.userData$
      .pipe(
        map(
          userData => {
            console.log('userdata', userData);
            // TODO: Brutally initiated array, too ugly
            dailyRecords[0] = {
              date: userData.endDate,
              countdown: 14,
              records: [],
            };
            for (let i = 1; i < 14; i++) {
              dailyRecords[i] = {
                date: this.dateDelta(userData.endDate, -i),
                countdown: 14 - i,
                records: [],
              };
            }
          }
        ),
        switchMap(() => this.storageService.recordMetaList$),
        mergeMap(recordMetaList => {
          return forkJoin(
            recordMetaList.map(recordMeta => this.storageService.getRecord(recordMeta))
          );
        }),
        mergeMap(records => {
          return forkJoin(
            records.map(record => {
              dailyRecords.some(dailyRecord => {
                console.log('formatted record timestamp', this.formatDate(record.timestamp));
                console.log('dailyRecord date', dailyRecord.date);
                if (this.formatDate(record.timestamp) === dailyRecord.date) {
                  dailyRecord.records.push(record);
                  console.log('push record', record);
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

  private createDailyRecord(recordDate: string): DailyRecord {
    return {
      date: recordDate,
      countdown: this.getCountdown(recordDate),
      records: [],
    };
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
