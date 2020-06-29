import { Injectable } from '@angular/core';
import { GeolocationPosition } from '@capacitor/core';
import { PopoverController } from '@ionic/angular';
import { defer, forkJoin, from, Observable, of, Subject } from 'rxjs';
import { catchError, delay, map, mergeMap, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { Symptoms } from '../classes/symptoms';
import { LocationStamp } from '../interfaces/location-stamp';
import { Photo } from '../interfaces/photo';
import { Record } from '../interfaces/record';
import { Meta } from '../interfaces/meta';
import { Snapshot } from '../interfaces/snapshot';
import { DataStoreService } from './data-store.service';
import { GeolocationService } from './geolocation.service';
import { PhotoService } from './photo.service';
import { RecordService } from './record.service';
import { PopoverIcon, PopoverService } from './popover.service';
import { ProofService } from './proof.service';

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
    private readonly dataStore: DataStoreService,
    private readonly proofService: ProofService,
    private readonly photoService: PhotoService,
    private readonly popoverService: PopoverService,
    private readonly recordService: RecordService,
  ) { }

  createPhotoWithProof(): Observable<Photo> {
    return forkJoin([
      this.photoService.createPhotoByCamera(),
      this.proofService.createProofWithLocation(),
    ])
      .pipe(
        map(([photo, proof]) => ({ ...photo, proof })),
      );
  }

  snapCapture() {
    return forkJoin([
      this.createPhotoWithProof(),
      this.dataStore.metas$.pipe(take(1)),
    ])
      .pipe(
        mergeMap(([photo, metas]) => {
          const record: Record = {
            timestamp: Date.now(),
            symptoms: new Symptoms(this.dataStore.getUserData().defaultSchema),
            photos: [photo],
          };
          return forkJoin([
            this.recordService.saveRecord(record, metas),
            this.showRecordSavedPopover(),
          ]);
        }),
        switchMap(([metas, _]) => this.dataStore.updateMetas(metas)),
      );
  }

  showRecordSavedPopover(): Observable<any> {
    return this.popoverService.showPopover(
      { i18nTitle: 'title.recordSaved', icon: PopoverIcon.CONFIRM },
      500,
      true,
    );
  }

  snapRecord(bodyTemperature: number, bodyTemperatureUnit: string, symptoms: Symptoms): Observable<Meta[]> {
    return this.photoService.createPhotoByCamera().pipe(map(_ => []));
    return forkJoin([
      this.proofService.createProofWithLocation(),
      this.dataStore.metas$.pipe(take(1)),
    ])
      .pipe(
        mergeMap(([proof, metas]) => {
          const record: Record = {
            bodyTemperature,
            bodyTemperatureUnit,
            symptoms,
            timestamp: proof.timestamp,
            locationStamp: proof.locationStamp,
            photos: [],
          };
          return this.recordService.saveRecord(record, metas);
        }),
        switchMap(metas => this.dataStore.updateMetas(metas)),
      );
  }

}
