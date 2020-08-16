import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Record } from '../classes/record';
import { DataTemplateService } from './data-template.service';
import { ProofService } from './proof.service';
import {
  RecordRepositoryService,
} from './repository/record-repository.service';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(
    private readonly dataTemplateService: DataTemplateService,
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

  create(dataTemplateName: string): Observable<Record> {
    const record = new Record(Date.now());
    return of(this.dataTemplateService.setRecordWithDataTemplate(record, dataTemplateName));
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
