import { Injectable } from '@angular/core';

import { forkJoin, Observable, of } from 'rxjs';
import { defaultIfEmpty, map, switchMap } from 'rxjs/operators';

import { Record } from '../../classes/record';
import { Meta } from '../../interfaces/meta';
import { LedgerService } from '../ledger.service';
import { FileSystemService } from '../storage/file-system.service';
import { LocalStorageService } from '../storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RecordRepositoryService {
  RECORD_META_KEY = 'records';

  constructor(
    private readonly fileSystem: FileSystemService,
    private readonly ledger: LedgerService,
    private readonly localStorage: LocalStorageService,
  ) { }

  get(meta: Meta): Observable<Record> {
    return this.fileSystem.getJsonData(meta.path);
  }

  getAll(): Observable<Record[]> {
    return this.getMetas()
      .pipe(
        switchMap(metas => forkJoin(metas.map(meta => this.get(meta)))),
        defaultIfEmpty([]),
      );
  }

  getJson(meta: Meta): Observable<string> {
    return this.fileSystem.getJsonData(meta.path, false);
  }

  getJsonAll(): Observable<string[]> {
    return this.getMetas()
      .pipe(
        switchMap(metas => forkJoin(metas.map(meta => this.getJson(meta))))
      );
  }

  delete(record: Record): Observable<Record[]> {
    return this.getMetas()
      .pipe(
        switchMap(metas => this.deleteRecordAndDeleteMeta(metas, record.timestamp)),
        switchMap(() => this.getAll()),
      );
  }

  save(record: Record): Observable<Record[]> {
    return this.saveRecordAndCreateMeta(record)
      .pipe(
        switchMap(meta => forkJoin([this.getMetas(), this.attachTransactionHash(meta)])),
        map(([metas, meta]) => [...metas, meta].sort((a, b) => a.timestamp - b.timestamp)),
        switchMap(metas => this.saveMetas(metas)),
        switchMap(() => this.getAll()),
      );
  }

  private attachTransactionHash(meta: Meta): Observable<Meta> {
    return this.ledger.createTransactionHash(meta.hash)
      .pipe(
        map(transactionHash => ({ ...meta, transactionHash })),
      );
  }

  private createMetaFromPath(timestamp: number, path: string): Observable<Meta> {
    return this.fileSystem.getFileHash(path)
      .pipe(
        map(hash => ({ timestamp, path, hash }) as Meta),
      );
  }

  private deleteRecordAndDeleteMeta(metas: Meta[], timestamp: number): Observable<Meta[]> {
    const meta = metas.find(el => el.timestamp === timestamp);
    const deleteRecord$ = (meta) ? this.fileSystem.deleteJsonData(meta.path) : of();
    const metaIdx = metas.findIndex(el => el.timestamp === timestamp);
    if (metaIdx) {
      metas.splice(metaIdx, 1);
    }
    return deleteRecord$
      .pipe(
        switchMap(() => this.saveMetas(metas)),
      );
  }

  private saveRecordAndCreateMeta(record: Record): Observable<Meta> {
    return this.fileSystem.saveJsonData(record)
      .pipe(
        switchMap(filename => this.createMetaFromPath(record.timestamp, filename)),
      );
  }

  private getMetas(): Observable<Meta[]> {
    return this.localStorage.getData(this.RECORD_META_KEY, []);
  }

  private saveMetas(metas: Meta[]): Observable<Meta[]> {
    return this.localStorage.setData(metas, this.RECORD_META_KEY);
  }

}
