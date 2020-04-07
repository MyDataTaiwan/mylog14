import { Injectable } from '@angular/core';
import { Plugins, FilesystemDirectory } from '@capacitor/core';
import { Record } from '../interfaces/record';
import { from, defer, forkJoin, of, BehaviorSubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { RecordMeta } from '../interfaces/record-meta';
import { UserData } from '../interfaces/user-data';

const { Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  RECORD_REPOSITORY = 'records';
  RECORD_DIRECTORY: string = FilesystemDirectory.Data;
  private recordMetaList = new BehaviorSubject<RecordMeta[]>([]);
  recordMetaList$ = this.recordMetaList.asObservable();
  USER_DATA_REPOSITORY = 'userData';
  USER_DATA_DIRECTORY: string = FilesystemDirectory.Data;
  private userData = new BehaviorSubject<UserData>({});
  userData$ = this.userData.asObservable();
  constructor() { }


  loadRecordMetaList() {
    return from(Storage.get({ key: this.RECORD_REPOSITORY }))
      .pipe(
        take(1),
        tap(() => console.log('Record Meta loaded')),
        map(repoRaw => {
          const recordMetaList: RecordMeta[] = (repoRaw.value) ? JSON.parse(repoRaw.value) : [];
          this.recordMetaList.next(recordMetaList);
          return this.recordMetaList.value;
        })
      );
  }

  loadUserData() {
    return from(Storage.get({ key: this.USER_DATA_REPOSITORY }))
      .pipe(
        take(1),
        tap(() => console.log('User data loaded')),
        map(repoRaw => {
          const userData: UserData = (repoRaw.value) ? JSON.parse(repoRaw.value) : [];
          this.userData.next(userData);
          return this.userData.value;
        })
      );
  }

  saveRecord(record: Record) {
    return forkJoin([
      // Save record JSON and get record repository in parallel
      this.saveRecordJSON(record).pipe(take(1)),
      from(Storage.get({ key: this.RECORD_REPOSITORY })).pipe(take(1)),
    ]).pipe(
      map(([fileName, repoRaw]) => {
        const recordMetaList: RecordMeta[] = (repoRaw.value) ? JSON.parse(repoRaw.value) : [];
        const recordMeta: RecordMeta = {
          timestamp: +fileName.slice(0, -4),
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
        this.recordMetaList.next(recordMetaList);
        return from(Storage.set({
          key: this.RECORD_REPOSITORY,
          value: JSON.stringify(recordMetaList),
        }));
      }),
    );
  }

  getRecord(timestamp: string) {
    return this.recordMetaList.value
      .find(recordMeta => recordMeta.path === timestamp);
  }

  getRecords() {
    return this.recordMetaList.value;
  }

  getUserData() {
    return this.userData.value;
  }

  saveUserData(userData: UserData) {
    return from(Storage.set({
      key: this.RECORD_REPOSITORY,
      value: JSON.stringify(userData),
    }));
  }


  getFileHash(fileName: string) {
    return '<file-hash-placeholder>';
  }

  // Get Record JSON from Filesystem
  private getRecordJSON(fileName: string) {
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

  // Save Record JSON to Filesystem
  private saveRecordJSON(record: Record) {
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
}
