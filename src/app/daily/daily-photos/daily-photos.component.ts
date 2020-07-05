import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import {
  defer, forkJoin, from, Observable, of,
  Subject,
} from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Photo } from 'src/app/core/classes/photo';
import { Record } from 'src/app/core/classes/record';

import { DataStoreService } from '@core/services/store/data-store.service';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ImgViewerPage } from '@shared/components/img-viewer/img-viewer.page';
import { LoadingService } from '@shared/services/loading.service';

export interface Pic {
  src: string;
}

export interface ModalAction {
  delete: boolean;
}

@Component({
  selector: 'app-daily-photos',
  templateUrl: './daily-photos.component.html',
  styleUrls: ['./daily-photos.component.scss'],
})
export class DailyPhotosComponent implements OnInit, OnDestroy {
  @Input() dayCount: number;
  photos$: Observable<Photo[]> = this.dataStore.photos$;
  destroy$ = new Subject();

  constructor(
    private readonly dataStore: DataStoreService,
    private readonly loadingService: LoadingService,
    public modalController: ModalController,
    private readonly translate: TranslateService,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  showImageViewer(photo: Photo) {
    /*
    this.getRecordByPhoto(photo)
      .pipe(
        switchMap(record => forkJoin([of(record), this.createModal(record, photo)])),
        switchMap(([record, modal]) => forkJoin([
          modal.present(),
          this.deletePhotoOnDismissHandler(modal, record, photo)
        ])),
        takeUntil(this.destroy$),
      )
      .subscribe(() => { }, e => console.log(e));
      */
  }

  deletePhotoOnDismissHandler(modal: HTMLIonModalElement, record: Record, photo: Photo) {
    return from(modal.onWillDismiss())
      .pipe(
        map(res => res.data.delete),
        filter(willDelete => willDelete === true),
        switchMap(() => forkJoin([
          this.showDeletingDataLoading(),
          of([]),
          // this.photoService.deletePhoto(record, photo),
        ])),
        switchMap(([loadingElement, __]) => loadingElement.dismiss()),
      );
  }

  createModal(record: Record, photo: Photo): Observable<HTMLIonModalElement> {
    return defer(() => from(this.modalController.create({
      component: ImgViewerPage,
      componentProps: { record, photo }
    })));
  }

  showDeletingDataLoading(): Observable<HTMLIonLoadingElement> {
    return this.translate.get('description.deletingData')
      .pipe(
        switchMap(msg => this.loadingService.showLoading(msg, 10000)),
      );
  }
}
