import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { DailyDetail } from '../daily-detail.page';

@Component({
  selector: 'app-daily-detail-upper',
  templateUrl: './daily-detail-upper.component.html',
  styleUrls: ['./daily-detail-upper.component.scss'],
})
export class DailyDetailUpperComponent implements OnInit, OnChanges {
  @Input() dailyDetail: DailyDetail;
  tempLocation = '&q=25.035221,121.557612';
  baseUrl = 'https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&z=16&output=embed&t=&q=';
  url = this.baseUrl + this.tempLocation;
  n2s=['不想減一','January','February','March','April','May','June','July','August','September','ctober','November','December']
  card = {
    day: 1,
    month: '3',
    date: '30',
    bt: 37.9,
    // Free-to-use mock image from https://pixabay.com/photos/cat-surprised-eyes-cat-s-eyes-2886062/
    imgSrc: 'https://cdn.pixabay.com/photo/2017/10/24/20/33/cat-2886062_1280.jpg',
    imgHeight: 300,
  };
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const dailyDetail: DailyDetail = changes.dailyDetail.currentValue;
    const latitude = dailyDetail.mapDots[0].latitude;
    const longitude = dailyDetail.mapDots[0].longitude;
    if (!latitude || !longitude) {
      return;
    }
    this.url = this.baseUrl + `${latitude},${longitude}`;
  }

}
