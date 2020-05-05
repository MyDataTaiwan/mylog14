import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, defer, from, Subject } from 'rxjs';
import { Photo } from 'src/app/core/interfaces/photo';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { map, switchMap, takeUntil, tap, take } from 'rxjs/operators';
import { PopoverController,ModalController } from '@ionic/angular';
import { ImgPopoverPage } from 'src/app/core/pages/img-popover/img-popover.page';
import { ImgViewerPage } from 'src/app/core/pages/img-viewer/img-viewer.page';

import { Record } from 'src/app/core/interfaces/record';



export interface Pic {
  src: string;
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
    private popoverController: PopoverController,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.photos$ = this.dataStore.dailyRecords$
      .pipe(
        map(dailyRecords => dailyRecords.list[this.dayCount - 1].records),
        map(records => records.map(record => record.photos)),
        map(nestedPhotos => nestedPhotos.reduce((flat, next) => flat.concat(next), [])),
        map(photos => photos.sort((a, b) => +b.timestamp - +a.timestamp)),
        tap(photos=>console.log(photos))
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

   openImageModal(photo: Photo) {
    this.getRecordByPhoto(photo)
      .pipe(
        switchMap(record => this.createPopover(record, photo)),
        switchMap(popover => popover.present()),
        takeUntil(this.destroy$),
      )
        .subscribe(() => {}, e => console.log(e));
  }

  createPopover(record: Record, photo: Photo): Observable<HTMLIonPopoverElement> {
    return defer(() => from(this.popoverController.create({
      component: ImgPopoverPage,
      // component: ImgViewerPage,
      translucent: true,
      componentProps: { record, photo }
    })));
  }

  async presentModal(photo: Photo) {
    const modal = await this.modalController.create({
      component: ImgViewerPage
    });
    return await modal.present();
  }

  getRecordByPhoto(photo: Photo): Observable<Record> {
    return this.dataStore.dailyRecords$
      .pipe(
        take(1),
        map(dailyRecords => dailyRecords.list[this.dayCount - 1].records),
        map(records => {
          return records.find(record => record.photos.some(p => p.filepath === photo.filepath));
        }),
      );
  }
}
