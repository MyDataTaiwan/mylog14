import { Component, OnInit,AfterViewInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { PhotoService } from 'src/app/core/services/photo.service';
import { DailyDetail } from '../daily-detail.page';
import { BehaviorSubject } from 'rxjs';
import { Photo } from 'src/app/core/interfaces/photo';

export interface Pic {
  src: string;
}



@Component({
  selector: 'app-daily-detail-photos',
  templateUrl: './daily-detail-photos.component.html',
  styleUrls: ['./daily-detail-photos.component.scss'],
})
export class DailyDetailPhotosComponent implements OnInit, OnChanges {
  @Input() dailyDetail: DailyDetail;
  private photos = new BehaviorSubject<Photo[]>([]);
  public photos$ = this.photos.asObservable();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const dailyDetail: DailyDetail = changes.dailyDetail.currentValue;
    const photos = [];
    dailyDetail.recordRows.forEach(recordRow => {
      recordRow.photos.forEach(photo => {
        if (!photos.find(p => p.timestamp === photo.timestamp)) {
          photos.push(photo);
        }
      });
    });
    this.photos.next(photos);
  }
}
