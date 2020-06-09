import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, defer, from, Subject, forkJoin, of } from 'rxjs';
import { Photo } from 'src/app/core/interfaces/photo';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { map, switchMap, takeUntil, tap, take, filter } from 'rxjs/operators';
import { PopoverController,ModalController, LoadingController } from '@ionic/angular';
import { ImgViewerPage } from 'src/app/core/pages/img-viewer/img-viewer.page';
import { Record } from 'src/app/core/interfaces/record';
import { PhotoService } from 'src/app/core/services/photo.service';
import { TranslateService } from '@ngx-translate/core';
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
    private dataStore: DataStoreService,
    private loadingCtrl: LoadingController,
    public modalController: ModalController,
    private photoService: PhotoService,
    private translate: TranslateService,
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
        .subscribe(() => {}, e => console.log(e));
  }

  deletePhotoOnDismissHandler(modal: HTMLIonModalElement, record: Record, photo: Photo) {
    return from(modal.onWillDismiss())
      .pipe(
        map(res => res.data.delete),
        filter(willDelete => willDelete === true),
        switchMap(() => forkJoin([
          this.presentLoading(),
          this.photoService.deletePhoto(record, photo),
        ])),
        switchMap(([[loadingElement, _], __]) => loadingElement.dismiss()),
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

  private presentLoading() {
    return this.translate.get('IMG_POPOVER.deleting')
      .pipe(
        switchMap(msg => {
          return defer(() => this.loadingCtrl.create({
            message: msg,
            duration: 10000,
          }));
        }),
        switchMap(loading => forkJoin([of(loading), loading.present()])),
      );
  }
}
