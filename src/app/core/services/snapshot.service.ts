import { Injectable } from '@angular/core';
import { Plugins, GeolocationPosition } from '@capacitor/core';
import { GeolocationService } from './geolocation.service';
import { LocationStamp } from '../interfaces/location-stamp';
import { Snapshot } from '../interfaces/snapshot';
import { PhotoService } from './photo.service';
import { Observable, pipe, forkJoin, from, of, combineLatest } from 'rxjs';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { StorageService } from './storage.service';

const { Geolocation } = Plugins;

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
          console.log(err);
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
    return Date.now().toString() + '.json';
  }

  createSnapshot(): Observable<Snapshot> {
    return this.getLocationStamp()
      .pipe(
        catchError(err => {
          console.log('Error Error', err);
          return of({latitude: 0, longitude: 0, accuracy: 0});
        }),
        map(location => {
          return {
            timestamp: this.getTimestamp(),
            locationStamp: location,
          };
        })
      );
  }

  createPhotoWithSnapshot(): Observable<any> {
    return this.createSnapshot()
      .pipe(
        mergeMap(snap => {
          return from(this.photoService.takePicture(snap))
            .pipe(map((photoBase64) => {
                return {s: snap, p: photoBase64};
            }));
        }),
        map(({s, p}) => {
          return {
            timestamp: s.timestamp,
            locationStamp: s.locationStamp,
            photos: [
              {
                byteString: p,
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
