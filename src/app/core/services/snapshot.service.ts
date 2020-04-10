import { Injectable } from '@angular/core';
import { GeolocationPosition } from '@capacitor/core';
import { GeolocationService } from './geolocation.service';
import { LocationStamp } from '../interfaces/location-stamp';
import { Snapshot } from '../interfaces/snapshot';
import { PhotoService } from './photo.service';
import { Observable, pipe, forkJoin, from, of, combineLatest, Subject } from 'rxjs';
import { catchError, map, switchMap, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { Photo } from '../interfaces/photo';
import { RecordService } from './record.service';

@Injectable({
  providedIn: 'root'
})
export class SnapshotService {
  constructor(
    private geolocationService: GeolocationService,
    private photoService: PhotoService,
    private recordService: RecordService,
    private storageService: StorageService,
  ) { }

  getLocationStamp(): Observable<LocationStamp> {
    return this.geolocationService.getPosition()
      .pipe(
        catchError(err => {
          console.log('Geolocation timeout. Set all value to 0.');
          const fakePos: GeolocationPosition = {
            coords: {
              latitude: 0, longitude: 0, accuracy: 0,
            },
            timestamp: 0,
          };
          return of(fakePos);
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

  getTimestamp(): string {
    return Date.now().toString();
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
      this.recordService.getLatestRecord(),
    ])
      .pipe(
        mergeMap(([photo, record]) => {
          if (!record.timestamp) {
            record.timestamp = photo.timestamp;
          }
          record.photos.push(photo);
          return this.storageService.saveRecord(record);
        }),
        // Trigger Daily Record cache update
        tap(() => this.recordService.loadDailyRecords),
      );
  }

}
