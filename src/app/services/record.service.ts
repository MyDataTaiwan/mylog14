import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Record } from '../interfaces/record';

const { Storage } = Plugins;

// WORKAROUND: The storage plugin is bad for this kind of data we're storing,
// since it is not efficient at storing/querying large amount of data
// Should switch to SQLite plugin or TypeORM later

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor() { }

  async createRecord(newRecord: Record) {
    const { value } = await Storage.get({ key: 'record' });
    let oldRecord: Record[] = JSON.parse(value);
    if (!oldRecord) { oldRecord = []; }
    oldRecord.push(newRecord);
    return Storage.set({
      key: 'record',
      value: JSON.stringify(oldRecord),
    });
  }

  async getRecords() {
    const { value } = await Storage.get({ key: 'record' });
    const oldRecord: Record[] = JSON.parse(value);
    return Promise.resolve(oldRecord);
  }
}
