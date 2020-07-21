import { Injectable } from '@angular/core';

import { empty } from 'rxjs';
import { map, mergeMap, repeat, take, tap } from 'rxjs/operators';

import { Record } from '@core/classes/record';
import { Proof } from '@core/interfaces/proof';

import { RecordService } from './record.service';
import { DataStoreService } from './store/data-store.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private readonly dataStore: DataStoreService,
    private readonly recordService: RecordService,
  ) { }

  gen(daysBackward: number) {
    return this.dataStore.userData$
      .pipe(
        take(1),
        tap(() => console.log('Upstream')),
        map(userData => userData.recordPreset),
        mergeMap(preset => this.recordService.create(preset)),
        repeat(daysBackward * 10),
        map(record => this.randomizeRecordData(record, daysBackward)),
        mergeMap(record => this.dataStore.pushRecord(record, false)),
        tap(() => console.log('Fake data created')),
        mergeMap(() => empty()),
      );
  }

  private createRandomProof(daysBackward: number) {
    const currentTime = Date.now();
    const startTime = currentTime - 86400 * 1000 * daysBackward;
    const proof: Proof = {
      timestamp: this.generateRandomInt(startTime, currentTime),
      location: {
        latitude: this.generateRandomFloat(22, 25),
        longitude: this.generateRandomFloat(120, 122),
        accuracy: this.generateRandomFloat(1, 30),
      }
    };
    return proof;
  }

  private randomizeRecordData(record: Record, daysBackward: number) {
    record.setProof(this.createRandomProof(daysBackward));
    record.fields.forEach(field => {
      let value = null;
      switch (field.type) {
        case 'number':
          value = this.generateRandomFloat(field.valueRange.min, field.valueRange.max);
          break;
        case 'string':
          value = 'This is a fake data';
          break;
        case 'boolean':
          value = (this.generateRandomInt(0, 1)) ? true : false;
          break;
        default:
          break;
      }
      record.setFieldValue(field.name, value);
    });
    return record;
  }

  private generateRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private generateRandomFloat(min: number, max: number) {
    return Math.floor((Math.random() * (max - min + 1) + min) * 100) / 100;
  }
}
