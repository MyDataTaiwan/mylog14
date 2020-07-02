import { Injectable } from '@angular/core';
import { PresetService, RecordPreset } from './preset.service';
import { RecordRepositoryService } from './repository/record-repository.service';
import { Observable, of } from 'rxjs';
import { ProofService } from './proof.service';
import { Record } from '../classes/record';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecordActionService {

  constructor(
    private readonly presetService: PresetService,
    private readonly proofService: ProofService,
    private readonly recordRepo: RecordRepositoryService,
  ) { }

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
