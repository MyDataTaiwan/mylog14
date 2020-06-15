import { Injectable } from '@angular/core';
import { GeolocationPosition } from '@capacitor/core';
import { PopoverController } from '@ionic/angular';
import { defer, forkJoin, from, Observable, of, Subject } from 'rxjs';
import { catchError, delay, map, mergeMap, switchMap, take, takeUntil } from 'rxjs/operators';
import { Symptoms } from '../classes/symptoms';
import { RecordFinishPage } from '../components/record-finish/record-finish.page';
import { LocationStamp } from '../interfaces/location-stamp';
import { Photo } from '../interfaces/photo';
import { Record } from '../interfaces/record';
import { RecordMeta } from '../interfaces/record-meta';
import { Snapshot } from '../interfaces/snapshot';
import { DataStoreService } from './data-store.service';
import { GeolocationService } from './geolocation.service';
import { LocalStorageService } from './local-storage.service';
import { PhotoService } from './photo.service';
import { RecordService } from './record.service';

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
    private popoverCtrl: PopoverController,
    private recordService: RecordService,
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
      this.dataStore.recordMetas$.pipe(take(1)),
      this.dataStore.userData$.pipe(take(1)),
    ])
      .pipe(
        mergeMap(([photo, recordMetas, userData]) => {
          const record: Record = {
            timestamp: photo.timestamp,
            symptoms: new Symptoms(userData.defaultSchema),
            photos: [photo],
          };
          return forkJoin([
            this.recordService.saveRecord(record, recordMetas),
            this.showCaptureFinish(),
          ]);
        }),
        switchMap(([recordMetas, _]) => this.dataStore.updateRecordMetas(recordMetas)),
      );
  }


  showCaptureFinish() {
    return defer(() => this.popoverCtrl.create({
      component: RecordFinishPage,
    }))
      .pipe(
        switchMap(popover => this.displayPopoverForDuration(popover, 0.5)),
      );
  }

  private displayPopoverForDuration(popover: HTMLIonPopoverElement, seconds: number) {
    return from(popover.present())
      .pipe(
        delay(seconds * 1000),
        switchMap(() => popover.dismiss()),
      );
  }

  snapRecord(bodyTemperature: number, bodyTemperatureUnit: string, symptoms: Symptoms): Observable<RecordMeta[]> {
    return forkJoin([
      this.createSnapshot(),
      this.dataStore.recordMetas$.pipe(take(1)),
    ])
      .pipe(
        mergeMap(([snapshot, recordMetas]) => {
          const record: Record = {
            bodyTemperature,
            bodyTemperatureUnit,
            symptoms,
            timestamp: snapshot.timestamp,
            locationStamp: snapshot.locationStamp,
            photos: [],
          };
          return this.recordService.saveRecord(record, recordMetas);
        }),
        switchMap(recordMetas => this.dataStore.updateRecordMetas(recordMetas)),
      );
  }

}
