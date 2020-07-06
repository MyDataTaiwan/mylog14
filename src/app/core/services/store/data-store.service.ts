import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';

import { Photo } from '@core/classes/photo';
import { PhotosByDate } from '@core/interfaces/photos-by-date';
import { RecordsByDate } from '@core/interfaces/records-by-date';

import { Record } from '../../classes/record';
import { UserData } from '../../interfaces/user-data';
import { RecordPreset } from '../preset.service';
import { PhotoRepositoryService } from '../repository/photo-repository.service';
import {
  RecordRepositoryService,
} from '../repository/record-repository.service';
import {
  UserDataRepositoryService,
} from '../repository/user-data-repository.service';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  private readonly initialized = new BehaviorSubject<boolean>(false);
  initialized$: Observable<boolean> = this.initialized;

  private readonly records = new BehaviorSubject<Record[]>([]);
  records$: Observable<Record[]> = this.records
    .pipe(
      map(records => records.filter(record => (record.templateName))),
    );

  private readonly userData = new BehaviorSubject<UserData>({
    firstName: '', lastName: '', recordPreset: RecordPreset.COMMON_COLD, newUser: true,
  });
  userData$: Observable<UserData> = this.userData;

  recordsByDate$: Observable<RecordsByDate> = this.records$
    .pipe(
      map(records => records.filter(record => record.templateName === this.userData.getValue().recordPreset)),
      map(records => this.getRecordsByDate(records)),
    );

  private readonly photos = new BehaviorSubject<Photo[]>([]);
  photos$: Observable<Photo[]> = this.photos;

  photosByDate$: Observable<PhotosByDate> = this.photos$
    .pipe(
      map(photos => this.getPhotosByDate(photos)),
    );


  constructor(
    private readonly photoRepo: PhotoRepositoryService,
    private readonly recordRepo: RecordRepositoryService,
    private readonly userDataRepo: UserDataRepositoryService,
  ) {
    this.initializeStore().subscribe();
  }

  deletePhoto(photo: Photo): Observable<Photo[]> {
    return this.photoRepo.delete(photo)
      .pipe(
        switchMap(() => this.photoRepo.getAll()),
        tap(photos => this.photos.next(photos)),
      );
  }

  pushPhoto(photo: Photo): Observable<Photo[]> {
    return this.photoRepo.save(photo)
      .pipe(
        tap(photos => this.photos.next(photos)),
      );
  }

  pushRecord(record: Record): Observable<Record[]> {
    return this.recordRepo.save(record)
      .pipe(
        tap(records => this.records.next(records)),
      );
  }

  createOrReplaceUserData(userData: UserData): Observable<UserData> {
    return this.userDataRepo.save(userData)
      .pipe(
        tap(newUserData => this.userData.next(newUserData)),
      );
  }

  flushRecord(): Observable<any> {
    return this.recordRepo.getAll()
      .pipe(
        tap(records => this.records.next(records)),
      );
  }

  updateUserData(data: {}): Observable<UserData> {
    return this.userDataRepo.get()
      .pipe(
        map(userData => ({ ...userData, ...data })),
        switchMap(newUserData => this.userDataRepo.save(newUserData)),
        tap(newUserData => this.userData.next(newUserData)),
      );
  }

  private initializeStore(): Observable<[UserData, Record[], Photo[]]> {
    const initUserData$ = this.userDataRepo.get()
      .pipe(
        tap(userData => this.userData.next(userData)),
      );
    const initRecords$ = this.recordRepo.getAll()
      .pipe(
        tap(records => this.records.next(records)),
      );
    const initPhotos$ = this.photoRepo.getAll()
      .pipe(
        tap(photos => this.photos.next(photos)),
      );
    return forkJoin([initUserData$, initRecords$, initPhotos$]).pipe(
      first(),
      tap(() => this.initialized.next(true)),
    );
  }

  private getPhotosByDate(photos: Photo[]): PhotosByDate {
    const initialDateGroups: PhotosByDate = {};
    return photos.reduce<{}>((dateGroups: PhotosByDate, photo) => {
      const date = formatDate(photo.timestamp, 'yyyy-MM-dd', 'en-us');
      if (!dateGroups[date]) {
        dateGroups[date] = [];
      }
      dateGroups[date].push(photo);
      return dateGroups;
    }, initialDateGroups);
  }

  private getRecordsByDate(records: Record[]): RecordsByDate {
    const initialDateGroups: RecordsByDate = {};
    return records.reduce<{}>((dateGroups: RecordsByDate, record) => {
      const date = formatDate(record.timestamp, 'yyyy-MM-dd', 'en-us');
      if (!dateGroups[date]) {
        dateGroups[date] = [];
      }
      dateGroups[date].push(record);
      return dateGroups;
    }, initialDateGroups);
  }

}
