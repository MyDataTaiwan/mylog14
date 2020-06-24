import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { defer, forkJoin, from, Observable, of, Subject } from 'rxjs';
import { filter, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { Photo } from 'src/app/core/interfaces/photo';
import { Record } from 'src/app/core/interfaces/record';
import { ImgViewerPage } from 'src/app/core/pages/img-viewer/img-viewer.page';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { PhotoService } from 'src/app/core/services/photo.service';
import { LoadingService } from 'src/app/core/services/loading.service';
export interface Pic {
  src: string;
}

export interface ModalAction {
  delete: boolean;
}

@Component({
  selector: 'app-daily-detail-photos',
  templateUrl: './daily-detail-photos.component.html',
  styleUrls: ['./daily-detail-photos.component.scss'],
})
export class DailyDetailPhotosComponent implements OnInit, OnDestroy {
  @Input() dayCount: number;
  photos$: Observable<Photo[]>;
  destroy$ = new Subject();

  constructor(
    private readonly dataStore: DataStoreService,
    private readonly loadingService: LoadingService,
    public modalController: ModalController,
    private readonly photoService: PhotoService,
    private readonly translate: TranslateService,
  ) { }

  ngOnInit() {
    this.photos$ = this.dataStore.dailyRecords$
      .pipe(
        map(dailyRecords => dailyRecords.list.find(dailyRecord => dailyRecord.dayCount === this.dayCount)),
        map(dailyRecord => dailyRecord.records),
        map(records => records.map(record => record.photos)),
        map(nestedPhotos => nestedPhotos.reduce((flat, next) => flat.concat(next), [])),
        map(photos => photos.sort((a, b) => +b.timestamp - +a.timestamp)),
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  showImageViewer(photo: Photo) {
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
  }

  deletePhotoOnDismissHandler(modal: HTMLIonModalElement, record: Record, photo: Photo) {
    return from(modal.onWillDismiss())
      .pipe(
        map(res => res.data.delete),
        filter(willDelete => willDelete === true),
        switchMap(() => forkJoin([
          this.showDeletingDataLoading(),
          this.photoService.deletePhoto(record, photo),
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

  getRecordByPhoto(photo: Photo): Observable<Record> {
    return this.dataStore.dailyRecords$
      .pipe(
        take(1),
        map(dailyRecords => dailyRecords.list.find(dailyRecord => dailyRecord.dayCount === this.dayCount)),
        map(dailyRecord => dailyRecord.records),
        map(records => {
          return records.find(record => record.photos.some(p => p.filepath === photo.filepath));
        }),
      );
  }

  showDeletingDataLoading(): Observable<HTMLIonLoadingElement> {
    return this.translate.get('description.deletingData')
      .pipe(
        switchMap(msg => this.loadingService.showLoading(msg, 10000)),
      );
  }
}
