import { Injectable } from '@angular/core';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { Record } from '../interfaces/record';
import { from, defer, forkJoin, of, BehaviorSubject, Observable, iif } from 'rxjs';
import { map, switchMap, take, tap, catchError, mergeMap } from 'rxjs/operators';
import { RecordMeta } from '../interfaces/record-meta';
import { UserData } from '../interfaces/user-data';

const { Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  RECORD_META_REPOSITORY = 'records';
  RECORD_META_DIRECTORY = FilesystemDirectory.Data;
  private recordMetaList = new BehaviorSubject<RecordMeta[]>([]);
  recordMetaList$ = this.recordMetaList.asObservable();
  USER_DATA_REPOSITORY = 'userData';
  USER_DATA_DIRECTORY = FilesystemDirectory.Data;
  private userData = new BehaviorSubject<UserData>({});
  userData$ = this.userData.asObservable();
  constructor() {
    this.loadUserData().subscribe();
    this.loadRecordMetaList().subscribe();
  }

  loadRecordMetaList(): Observable<RecordMeta[]> {
    return defer(() => from(Storage.get({ key: this.RECORD_META_REPOSITORY }))
      .pipe(
        take(1),
        mergeMap(repoRaw => iif(() => repoRaw.value !== undefined, of(JSON.parse(repoRaw.value)), of({}))),
        map((recordMetaList: RecordMeta[]) => {
          this.recordMetaList.next(recordMetaList);
          return this.recordMetaList.getValue();
        })
      )
    );
  }

  loadUserData(): Observable<UserData> {
    return defer(() => from(Storage.get({ key: this.USER_DATA_REPOSITORY }))
      .pipe(
        take(1),
        mergeMap(repoRaw => iif(() => repoRaw.value !== undefined, of(JSON.parse(repoRaw.value)), of({}))),
        map((userData: UserData) => {
          this.userData.next(userData);
          return this.userData.getValue();
        })
      )
    );
  }

  saveRecord(record: Record) {
    return forkJoin([
      // Save record JSON and get record repository in parallel
      this.saveRecordJSON(record),
      from(Storage.get({ key: this.RECORD_META_REPOSITORY })).pipe(take(1)),
    ]).pipe(
      map(([fileName, repoRaw]) => {
        const recordMetaList: RecordMeta[] = (repoRaw.value) ? JSON.parse(repoRaw.value) : [];
        const recordMeta: RecordMeta = {
          timestamp: +fileName.slice(0, -4),
          path: fileName,
          directory: this.RECORD_META_DIRECTORY,
          hash: this.getFileHash(fileName),
        };
        // Check if a record with the same filename (timestamp) exists
        const oldRecordMeta = this.recordMetaList.getValue().find(r => r.path === fileName);
        // Update or create recordMeta
        if (oldRecordMeta) {
          recordMetaList[recordMetaList.indexOf(oldRecordMeta)] = recordMeta;
        } else {
          recordMetaList.push(recordMeta);
        }
        return recordMetaList;
      }),
      switchMap((recordMetaList: RecordMeta[]) => {
        console.log('Storage service: updated recordMetaList', recordMetaList);
        return forkJoin([
          from(Storage.set({
            key: this.RECORD_META_REPOSITORY,
            value: JSON.stringify(recordMetaList),
          })),
          of(recordMetaList),
        ]);
      }),
      tap(([_, recordMetaList]) => this.recordMetaList.next(recordMetaList))
    );
  }

  getRecord(recordMeta: RecordMeta): Observable<Record> {
    return this.getRecordJSON(recordMeta.path, recordMeta.directory);
  }

  getRecords(recordMetaList: RecordMeta[]): Observable<Record[]> {
    return forkJoin(
      recordMetaList.map(recordMeta => this.getRecord(recordMeta)),
    );
  }

  getRecordMetaByTimestamp(timestamp: number) {
    return this.recordMetaList.getValue()
      .find(recordMeta => recordMeta.timestamp === timestamp);
  }

  getRecordMetaList() {
    return this.recordMetaList.getValue();
  }

  getUserData() {
    return this.userData.getValue();
  }

  saveUserData(userData: UserData) {
    return from(Storage.set({
      key: this.USER_DATA_REPOSITORY,
      value: JSON.stringify(userData),
    })).pipe(tap(() => this.userData.next(userData)));
  }

  getFileHash(fileName: string) {
    return '<file-hash-placeholder>';
  }

  // Get Record JSON from Filesystem
  private getRecordJSON(fileName: string, dir = FilesystemDirectory.Data) {
    return defer(
      () => from(Filesystem.readFile({
        encoding: FilesystemEncoding.UTF8,
        path: fileName,
        directory: dir,
      }))
        .pipe(
          take(1),
          map(readResult => {
            let record: Record = { timestamp: '', photos: [] };
            try {
              record = JSON.parse(readResult.data);
            } catch {
              console.log('Failed to parse recorded JSON: ', readResult);
            }
            return record;
          }),
        )
    );
  }

  // Save Record JSON to Filesystem
  private saveRecordJSON(record: Record, dir = FilesystemDirectory.Data) {
    const fileName = record.timestamp + '.json';
    return defer(
      () => from(Filesystem.writeFile({
        encoding: FilesystemEncoding.UTF8,
        path: fileName,
        data: JSON.stringify(record),
        directory: dir,
      }))
        .pipe(
          take(1),
          map(fileWriteResult => {
            console.log('Record successfully saved, filename: ', fileName);
            return fileName;
          }),
        )
    );
  }
}
