import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { forkJoin, Observable, Subject } from 'rxjs';
import { filter, mergeMap, switchMap, takeUntil } from 'rxjs/operators';

import { Record } from '@core/classes/record';
import { LocationApiService } from '@core/http/location-api.service';
import { DataStoreService } from '@core/services/store/data-store.service';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from '@shared/services/loading.service';
import {
  PopoverButtonSet, PopoverService,
} from '@shared/services/popover.service';

@Component({
  selector: 'app-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.scss'],
})
export class PhotoViewerComponent implements OnInit, OnDestroy {
  @Input() record: Record;

  address$: Observable<string>;
  destroy$ = new Subject();

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly dataStore: DataStoreService,
    private readonly loadingService: LoadingService,
    private readonly locationApiService: LocationApiService,
    private readonly popoverService: PopoverService,
    private readonly translateService: TranslateService,
  ) { }

  ngOnInit() {
    this.address$ = this.getAddress(this.record);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getAddress(record: Record): Observable<string> {
    const noLocationData$ = this.translateService.get('title.noLocationData');
    if (!record.proof) {
      return noLocationData$;
    } else if (!record.proof.location) {
      return noLocationData$;
    } else if (!record.proof.location.latitude || !record.proof.location.longitude) {
      return noLocationData$;
    } else {
      return this.locationApiService.getReverseGeocoding(record.proof.location.latitude, record.proof.location.longitude);
    }
  }

  delete() {
    this.showDeletePhotoPopover()
      .pipe(
        filter(res => (res.data === 'delete')),
        switchMap(() => this.deletePhotoWithLoading()),
        switchMap(() => this.modalCtrl.dismiss()),
      ).subscribe();
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  private showDeletePhotoPopover(): Observable<any> {
    return this.popoverService.showPopover({
      i18nTitle: 'title.deletePhoto',
      i18nMessage: 'description.deletePhotoPopover',
      buttonSet: PopoverButtonSet.CONFIRM,
      dataOnConfirm: 'delete',
    });
  }

  private deletePhotoWithLoading(): Observable<any> {
    return forkJoin([
      this.loadingService.showLoading('description.deletingPhoto', 10000),
      this.dataStore.deleteRecord(this.record),
    ])
      .pipe(
        mergeMap(([loading, _]) => loading.dismiss()),
        takeUntil(this.destroy$),
      );
  }
}
