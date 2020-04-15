import { Injectable } from '@angular/core';
import { GeolocationPosition } from '@capacitor/core';
import { GeolocationService } from './geolocation.service';
import { LocationStamp } from '../interfaces/location-stamp';
import { Snapshot } from '../interfaces/snapshot';
import { PhotoService } from './photo.service';
import { Observable, pipe, forkJoin, from, of, Subject } from 'rxjs';
import { catchError, map, switchMap, mergeMap, takeUntil, tap, take } from 'rxjs/operators';
import { Photo } from '../interfaces/photo';
import { Record } from '../interfaces/record';
import { Symptoms } from '../classes/symptoms';
import { LocalStorageService } from './local-storage.service';
import { DataStoreService } from './data-store.service';
import { RecordMeta } from '../classes/record-meta';

@Injectable({
  providedIn: 'root'
})
export class SnapshotService {
  fakePos: GeolocationPosition = {
    coords: {
      latitude: 0, longitude: 0, accuracy: 0,
    },
    timestamp: 0,
  };
  constructor(
    private dataStore: DataStoreService,
    private geolocationService: GeolocationService,
    private photoService: PhotoService,
    private localStorage: LocalStorageService,
  ) { }

  getLocationStamp(): Observable<LocationStamp> {
    return this.geolocationService.getPosition()
      .pipe(
        catchError(err => {
          console.log('Geolocation timeout. Set all value to 0.', err);
          return of(this.fakePos);
        }),
        map(pos => pos.coords),
        map(coords => {
          return {
            latitude: coords.latitude,
            longitude: coords.longitude,
            accuracy: coords.accuracy,
          };
        }),
      );
  }

  getTimestamp(): number {
    return Date.now();
  }

  createSnapshot(): Observable<Snapshot> {
    return this.getLocationStamp()
      .pipe(
        map(location => {
          return {
            timestamp: this.getTimestamp(),
            locationStamp: location,
          };
        })
      );
  }

  createPhotoWithSnapshot(): Observable<Photo> {
    // Start trying to get geolocation as soon as this function is called.
    // In the meanwhile, open the built-in camera. If the user finished taking a photo,
    // takePhotoSignal$ is used to trigger complete signal for createSnapshot observable
    // The observable then yields fake location data
    const takePhotoSignal$ = new Subject();
    const subscription = takePhotoSignal$.subscribe();
    return forkJoin([
      this.photoService.startCapture(takePhotoSignal$),
      this.createSnapshot().pipe(takeUntil(takePhotoSignal$)),
    ])
      .pipe(
        switchMap(([capturedPhoto, snapshot]) => {
          subscription.unsubscribe();
          return from(this.photoService.createPicture(capturedPhoto, snapshot));
        }),
        map(({ photo, metadata }) => {
          photo.timestamp = metadata.timestamp;
          photo.locationStamp = metadata.locationStamp;
          return photo;
        }),
      );
  }

  snapCapture() {
    return forkJoin([
      this.createPhotoWithSnapshot(),
      this.dataStore.recordMetaList$.pipe(take(1)),
    ])
      .pipe(
        mergeMap(([photo, recordMetaList]) => {
          const record: Record = {
            timestamp: photo.timestamp,
            symptoms: new Symptoms(),
            photos: [photo],
          };
          return this.localStorage.saveRecord(record, recordMetaList);
        }),
        switchMap(recordMetaList => this.dataStore.updateRecordMetaList(recordMetaList)),
      );
  }

  snapRecord(bodyTemperature: number, bodyTemperatureUnit: string, symptoms: Symptoms): Observable<RecordMeta[]> {
    return forkJoin([
      this.createSnapshot(),
      this.dataStore.recordMetaList$.pipe(take(1)),
    ])
      .pipe(
        mergeMap(([snapshot, recordMetaList]) => {
          const record: Record = {
            bodyTemperature,
            bodyTemperatureUnit,
            symptoms,
            timestamp: snapshot.timestamp,
            locationStamp: snapshot.locationStamp,
            photos: [],
          };
          return this.localStorage.saveRecord(record, recordMetaList);
        }),
        switchMap(recordMetaList => this.dataStore.updateRecordMetaList(recordMetaList)),
      );
  }

}
