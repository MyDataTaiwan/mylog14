import { Injectable } from '@angular/core';
import { DailyRecord } from '../interfaces/daily-record';
import { StorageService } from './storage.service';
import { map } from 'rxjs/operators';
import { UserData } from '../interfaces/user-data';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  cachedUserData: UserData;
  cachedDailyRecords: DailyRecord[] = [];
  constructor(
    private storageService: StorageService,
  ) { }

  createDummyUserData() {
    const dateToday = new Date();
    const dateStart = formatDate(dateToday, 'yyyy/MM/dd', 'en-us');
    const dateEnd = formatDate(dateToday.setDate(dateToday.getDate() + 14), 'yyyy/MM/dd', 'en-us');
    const userData: UserData = {
      uuid: '<uuid-placeholder>',
      language: 'zh-TW',
      timezone: '+0800',
      startDate: dateStart,
      endDate: dateEnd,
    };
    return this.storageService.saveUserData(userData);
  }

  updateCachedDailyRecords() {
    this.storageService.updateRecordMetaCache()
      .pipe(
        map(recordMetaList => {
          recordMetaList.map(recordMeta => {
            return recordMeta;
          });
        })
      );
  }

  updateCachedUserData() {

  }
}
