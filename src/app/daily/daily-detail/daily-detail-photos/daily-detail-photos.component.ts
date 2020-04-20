import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from 'src/app/core/interfaces/photo';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { map } from 'rxjs/operators';
import { ModalController, PopoverController } from '@ionic/angular';
// import { CategorizeImgPopoverPage } from './categorize-img-popover/categorize-img-popover.page';
import { PhotoService } from 'src/app/core/services/photo.service';
import { CategorizeImgPopoverPage } from '../../../category/category-pending/categorize-img-popover/categorize-img-popover.page';



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

  async openIMGModal(photo, ev?: any) {
    const popover = await this.popoverController.create({
      component: CategorizeImgPopoverPage,
      event: ev,
      translucent: true,
      componentProps: {
        paramID: 123,
        paramTitle: 'Test Title',
        timestamp: photo.timestamp,
        time: new Date(parseInt(photo.timestamp, 10)),
        latitude: photo.locationStamp.latitude,
        longitude: photo.locationStamp.longitude,
        webviewPath: photo.webviewPath
      }
    });
    console.log(photo.snapshot)
    return await popover.present();
  }
}
