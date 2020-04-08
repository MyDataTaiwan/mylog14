import { Injectable } from '@angular/core';
import { Plugins, FilesystemDirectory, FileWriteResult } from '@capacitor/core';
import { Record } from '../interfaces/record';
import { formatDate } from '@angular/common';
import { Observable, from, defer, forkJoin, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap, take, filter } from 'rxjs/operators';
import { RecordMeta } from '../interfaces/record-meta';

const { Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  RECORD_REPOSITORY = 'records';
  RECORD_DIRECTORY: string = FilesystemDirectory.Data;
  recordMetaCache: RecordMeta[];
  constructor() { }

  saveRecordJSON(record: Record) {
    const fileName = record.timestamp;
    return defer(
      () => from(Filesystem.writeFile({
        path: fileName,
        data: JSON.stringify(record),
        directory: FilesystemDirectory.Data,
      }))
        .pipe(
          take(1),
          map(_ => {
            console.log(_);
            return fileName;
          }),
        )
    );
  }

  getRecordJSON(fileName: string) {
    return defer(
      () => from(Filesystem.readFile({
        path: fileName,
        directory: FilesystemDirectory.Data,
      }))
        .pipe(
          take(1),
          map(readResult => JSON.parse(readResult.data)),
        )
    );
  }

  saveRecord(record: Record) {
    return forkJoin([
      // Save record JSON and get record repository in parallel
      this.saveRecordJSON(record).pipe(take(1)),
      from(Storage.get({ key: this.RECORD_REPOSITORY })).pipe(take(1)),
    ]).pipe(
        map(([fileName, repoRaw]) => {
          console.log('filename:', fileName);
          console.log('value', repoRaw.value);
          const recordMetaList: RecordMeta[] = (repoRaw.value) ? JSON.parse(repoRaw.value) : [];
          const recordMeta: RecordMeta = {
            path: fileName,
            directory: this.RECORD_DIRECTORY,
            hash: this.getFileHash(fileName),
          };
          // Check if a record with the same filename (timestamp) exists
          const oldRecordMeta = recordMetaList.find(r => r.path === fileName);
          // Update or create recordMeta
          if (oldRecordMeta) {
            recordMetaList[recordMetaList.indexOf(oldRecordMeta)] = recordMeta;
          } else {
            recordMetaList.unshift(recordMeta);
          }
          console.log(recordMetaList);
          return recordMetaList;
        }),
      switchMap((recordMetaList: RecordMeta[]) => {
          // FIXME: It's not guaranteed that the storage and cache will sync if Storage.set fails
          this.recordMetaCache = recordMetaList;
          console.log('cache:', this.recordMetaCache);
          return from(Storage.set({
            key: this.RECORD_REPOSITORY,
            value: JSON.stringify(recordMetaList),
          }));
        }
      ),
    );
  }

  getRecord(timestamp: string, useCache = true) {
    const record$ = (useCache) ? of(this.recordMetaCache) : this.updateRecordMetaCache();
    return record$
      .pipe(
        take(1),
        map(recordMetaList => {
            return recordMetaList.find(r => r.path === timestamp);
          }
        )
      );
  }

  getRecords(useCache = true) {
    const record$ = (useCache) ? of(this.recordMetaCache) : this.updateRecordMetaCache();
    return record$.pipe(take(1));
  }

  updateRecordMetaCache() {
    return from(Storage.get({ key: this.RECORD_REPOSITORY }))
      .pipe(
        take(1),
        map(repoRaw => {
          const recordMetaList: RecordMeta[] = (repoRaw.value) ? JSON.parse(repoRaw.value) : [];
          this.recordMetaCache = recordMetaList;
          return this.recordMetaCache;
        })
      );
  }

  getFileHash(fileName: string) {
    return '<file-hash-placeholder>';
  }
}
