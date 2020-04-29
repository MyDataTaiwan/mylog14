import { Injectable } from '@angular/core';
import { Plugins, FilesystemDirectory } from '@capacitor/core';
import { Observable, defer, from, forkJoin, of } from 'rxjs';
import { RecordMeta } from '../classes/record-meta';
import { mergeMap, map, tap, switchMap } from 'rxjs/operators';
import { FileSystemService } from './file-system.service';
import { Record } from '../interfaces/record';
import { UserData } from '../interfaces/user-data';
import { LedgerService } from './ledger.service';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  RECORD_META_REPOSITORY = 'records';
  USER_DATA_REPOSITORY = 'userData';

  RECORD_DIRECTORY = FilesystemDirectory.Data;

  constructor(
    private fileSystem: FileSystemService,
    private ledger: LedgerService,
  ) { }

  getRecord(recordMeta: RecordMeta): Observable<Record> {
    return this.fileSystem.getJsonData(recordMeta.path, recordMeta.directory);
  }

  getRecords(recordMetaList: RecordMeta[]): Observable<Record[]> {
    return forkJoin(
      recordMetaList.map(recordMeta => this.getRecord(recordMeta)),
    );
  }

  getRawRecords(recordMetaList: RecordMeta[]): Observable<string[]> {
    return forkJoin(
      recordMetaList.map(recordMeta => this.fileSystem.getJsonData(recordMeta.path, recordMeta.directory, false)),
    );
  }

  saveRecord(record: Record, recordMetaList: RecordMeta[]): Observable<RecordMeta[]> {
    const fileSave$ = this.fileSystem.saveJsonData(record);
    return fileSave$
      .pipe(
        mergeMap(filename => forkJoin([of(filename), this.fileSystem.getFileHash(filename)])),
        map(([filename, hash]) => new RecordMeta(record.timestamp, filename, this.RECORD_DIRECTORY, hash)),
        switchMap(recordMeta => forkJoin([of(recordMeta), this.ledger.createTransactionHash(recordMeta.hash)])),
        map(([recordMeta, transHash]) => {
          recordMeta.transactionHash = transHash;
          return recordMeta;
        }),
        map(recordMeta => {
          recordMetaList.push(recordMeta);
          return recordMetaList;
        }),
      );
  }

  getRecordMetaList(): Observable<RecordMeta[]> {
    return this.getData(this.RECORD_META_REPOSITORY, '[]');
  }

  saveRecordMetaList(recordMetaList: RecordMeta[]): Observable<RecordMeta[]> {
    return this.setData(recordMetaList, this.RECORD_META_REPOSITORY);
  }

  getUserData(): Observable<UserData> {
    return this.getData(this.USER_DATA_REPOSITORY, '{ "newUser": true }');
  }

  saveUserData(userData: UserData): Observable<UserData> {
    return this.setData(userData, this.USER_DATA_REPOSITORY);
  }

  private getData(repo: string, defaultData: string): Observable<any> {
    return defer(() => from(Storage.get({ key: repo }))).pipe(
      map(raw => raw.value),
      map(value => (value) ? value : defaultData),
      map(str => JSON.parse(str)),
    );
  }

  private setData<T>(data: T, repo: string): Observable<T> {
    return defer(() =>
      from(Storage.set({
        key: repo,
        value: JSON.stringify(data),
      }))
    ).pipe(
      map(() => data),
    );
  }
}
