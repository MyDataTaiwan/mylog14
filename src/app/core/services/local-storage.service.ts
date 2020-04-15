import { Injectable } from '@angular/core';
import { Plugins, FilesystemDirectory } from '@capacitor/core';
import { Observable, defer, from, forkJoin, of } from 'rxjs';
import { RecordMeta } from '../classes/record-meta';
import { mergeMap, map, tap } from 'rxjs/operators';
import { FileSystemService } from './file-system.service';
import { Record } from '../interfaces/record';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  RECORD_META_REPOSITORY = 'records';
  RECORD_META_DIRECTORY = FilesystemDirectory.Data;

  constructor(
    private fileSystem: FileSystemService,
  ) { }

  getRecord(recordMeta: RecordMeta): Observable<Record> {
    return this.fileSystem.getJsonData(recordMeta.path, recordMeta.directory);
  }

  getRecords(recordMetaList: RecordMeta[]): Observable<Record[]> {
    return forkJoin(
      recordMetaList.map(recordMeta => this.getRecord(recordMeta)),
    );
  }

  saveRecord(record: Record, recordMetaList: RecordMeta[]): Observable<RecordMeta[]> {
    const fileSave$ = this.fileSystem.saveJsonData(record);
    return fileSave$
      .pipe(
        mergeMap(filename => forkJoin([of(filename), this.fileSystem.getFileHash(filename)])),
        map(([filename, hash]) => new RecordMeta(record.timestamp, filename, this.RECORD_META_DIRECTORY, hash)),
        map(recordMeta => {
          recordMetaList.push(recordMeta);
          return recordMetaList;
        }),
      );
  }

  getRecordMetaList(): Observable<RecordMeta[]> {
    return this.getData(this.RECORD_META_DIRECTORY);
  }

  saveRecordMetaList(recordMetaList: RecordMeta[]): Observable<RecordMeta[]> {
    return this.setData(recordMetaList, this.RECORD_META_DIRECTORY);
  }

  private getData(dir = FilesystemDirectory.Data): Observable<any> {
    return defer(() => from(Storage.get({ key: dir }))).pipe(
      map(raw => raw.value),
      map(value => (value) ? value : '[]'),
      map(str => JSON.parse(str)),
    );
  }

  private setData<T>(data: T, dir = FilesystemDirectory.Data): Observable<T> {
    return defer(() =>
      from(Storage.set({
        key: dir,
        value: JSON.stringify(data),
      }))
    ).pipe(
      map(() => data),
    );
  }
}
