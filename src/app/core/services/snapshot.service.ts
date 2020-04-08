import { Injectable } from '@angular/core';
import { GeolocationPosition } from '@capacitor/core';
import { GeolocationService } from './geolocation.service';
import { LocationStamp } from '../interfaces/location-stamp';
import { Snapshot } from '../interfaces/snapshot';
import { PhotoService } from './photo.service';
import { Observable, pipe, forkJoin, from, of, combineLatest, Subject } from 'rxjs';
import { catchError, map, switchMap, mergeMap, takeUntil } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SnapshotService {
  constructor(
    private geolocationService: GeolocationService,
    private photoService: PhotoService,
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

  createPhotoWithSnapshot(): Observable<any> {
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
        map(({base64, metadata}) => {
          return {
            timestamp: metadata.timestamp,
            locationStamp: metadata.locationStamp,
            photos: [
              {
                byteString: base64,
              }
            ]
          };
        })
      );
  }

  snapCapture(): Observable<void> {
    return this.createPhotoWithSnapshot()
      .pipe(
        switchMap(record => {
          console.log('Record:', record);
          return this.storageService.saveRecord(record);
        })
      );
  }

}
