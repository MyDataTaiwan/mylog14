import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from 'src/app/core/interfaces/photo';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { map } from 'rxjs/operators';
import { PopoverController } from '@ionic/angular';
import { ImgPopoverPage } from 'src/app/core/pages/img-popover/img-popover.page';


export interface Pic {
  src: string;
}



@Component({
  selector: 'app-daily-detail-photos',
  templateUrl: './daily-detail-photos.component.html',
  styleUrls: ['./daily-detail-photos.component.scss'],
})
export class DailyDetailPhotosComponent implements OnInit {
  @Input() dayCount: number;
  photos$: Observable<Photo[]>;

  constructor(
    private dataStore: DataStoreService,
    private popoverController: PopoverController,
  ) { }

  ngOnInit() {
    this.photos$ = this.dataStore.dailyRecords$
      .pipe(
        map(dailyRecords => dailyRecords.list[this.dayCount - 1].records),
        map(records => records.map(record => record.photos)),
        map(nestedPhotos => nestedPhotos.reduce((flat, next) => flat.concat(next), [])),
        map(photos => photos.sort((a, b) => +b.timestamp - +a.timestamp)),
      );
  }

  async openImageModal(photo: Photo) {
    const popover = await this.popoverController.create({
      component: ImgPopoverPage,
      translucent: true,
      componentProps: {
        timestamp: photo.timestamp,
        latitude: photo.locationStamp.latitude,
        longitude: photo.locationStamp.longitude,
        webviewPath: photo.webviewPath
      }
    });
    return await popover.present();
  }
}
