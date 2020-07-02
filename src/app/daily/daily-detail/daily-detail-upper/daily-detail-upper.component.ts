import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-daily-detail-upper',
  templateUrl: './daily-detail-upper.component.html',
  styleUrls: ['./daily-detail-upper.component.scss'],
})
export class DailyDetailUpperComponent implements OnInit {
  selectedSymptoms = false;
  @Input() dayCount: number;
  tempLocation = '&q=25.035221,121.557612';
  baseUrl = 'https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&z=16&output=embed&t=&q=';
  url = this.baseUrl + this.tempLocation;
  isShowMap = false;

  constructor(
  ) { }

  ngOnInit() {
  }

  onClickOutside() {
    if (this.selectedSymptoms) {
      this.selectedSymptoms = !this.selectedSymptoms;
    }
  }

  updateMapUrl(locations: any): void {
    if (locations.length < 1) {
      this.isShowMap = false;
      return;
    }
    const lat = locations[locations.length - 1].latitude;
    const lon = locations[locations.length - 1].longitude;
    this.url = this.baseUrl + `${lat},${lon}`;
    this.isShowMap = true;
  }

  parseFloat(string: string): number {
    return parseFloat(string);
  }
}
