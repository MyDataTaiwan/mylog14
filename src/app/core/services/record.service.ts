import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Record } from '../classes/record';
import { PresetService, RecordPreset } from './preset.service';
import { ProofService } from './proof.service';
import {
  RecordRepositoryService,
} from './repository/record-repository.service';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(
    private readonly presetService: PresetService,
    private readonly proofService: ProofService,
    private readonly recordRepo: RecordRepositoryService,
  ) { }

  attachProof(record: Record): Observable<Record> {
    return this.proofService.createProof()
      .pipe(
        map(proof => {
          record.setProof(proof);
          return record;
        }),
      );
  }

  create(preset: RecordPreset): Observable<Record> {
    const record = new Record(Date.now());
    return of(this.presetService.initRecordWithPreset(record, preset));
  }

  save(record: Record): Observable<Record[]> {
    return this.recordRepo.save(record);
  }


}

export interface RecordQueryOptions {
  timestampEqual?: number;
  timestampMax?: number;
  timestampMin?: number;
  hash?: string;
  transactionHash?: string;
}
