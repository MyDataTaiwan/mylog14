import { Injectable } from '@angular/core';
import { FilesystemDirectory } from '@capacitor/core';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Record } from '../interfaces/record';
import { FileSystemService } from './file-system.service';
import { LedgerService } from './ledger.service';
import { LocalStorageService } from './local-storage.service';
import { Meta } from '../interfaces/meta';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  RECORD_META_REPOSITORY = 'records';
  RECORD_DIRECTORY = FilesystemDirectory.Data;

  constructor(
    private readonly fileSystem: FileSystemService,
    private readonly ledger: LedgerService,
    private readonly localStorage: LocalStorageService,
  ) { }

  getRecord(meta: Meta): Observable<Record> {
    return this.fileSystem.getJsonData(meta.path, meta.directory);
  }

  getRecords(metas: Meta[]): Observable<Record[]> {
    return forkJoin(
      metas.map(meta => this.getRecord(meta)),
    );
  }

  getRawRecords(metas: Meta[]): Observable<string[]> {
    return forkJoin(
      metas.map(meta => this.fileSystem.getJsonData(meta.path, meta.directory, false)),
    );
  }

  saveRecord(record: Record, metas: Meta[]): Observable<Meta[]> {
    const fileSave$ = this.fileSystem.saveJsonData(record);
    return fileSave$
      .pipe(
        switchMap(filename => this.fileSystem.getFileHash(filename)
          .pipe(
            map(fileHash => [filename, fileHash])),
        ),
        switchMap(([filename, fileHash]) => this.ledger.createTransactionHash(fileHash)
          .pipe(
            map(transactionHash => [filename, fileHash, transactionHash]),
          )
        ),
        map(([filename, fileHash, transactionHash]) => {
          return this.createMeta(record.timestamp, filename, fileHash, transactionHash);
        }),
        map(meta => {
          metas.push(meta);
          return metas;
        }),
      );
  }

  getMetas(): Observable<Meta[]> {
    return this.localStorage.getData(this.RECORD_META_REPOSITORY, []);
  }

  saveMetas(metas: Meta[]): Observable<Meta[]> {
    return this.localStorage.setData(metas, this.RECORD_META_REPOSITORY);
  }

  private createMeta(timestamp: number, filename: string, fileHash: string, transactionHash: string): Meta {
    return {
      timestamp,
      path: filename,
      directory: this.RECORD_DIRECTORY,
      hash: fileHash,
      transactionHash,
    };
  }

}
