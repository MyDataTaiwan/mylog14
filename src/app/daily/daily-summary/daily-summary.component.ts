import { Component, Input, OnInit } from '@angular/core';

import { map } from 'rxjs/operators';

import { RecordRenderService } from '@core/services/record-render.service';
import { DataStoreService } from '@core/services/store/data-store.service';

@Component({
  selector: 'app-daily-summary',
  templateUrl: './daily-summary.component.html',
  styleUrls: ['./daily-summary.component.scss'],
})
export class DailySummaryComponent implements OnInit {
  selectedSymptoms = false;
  @Input() date: string;
  tempLocation = '&q=25.035221,121.557612';
  baseUrl = 'https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&z=16&output=embed&t=&q=';
  url = this.baseUrl + this.tempLocation;
  isShowMap = false;
  dailySummary$ = this.dataStore.recordsByDate$
    .pipe(
      map(recordsByDate => this.recordRenderService.createDailySummary(0, this.date, recordsByDate[this.date])),
    );

  constructor(
    private readonly dataStore: DataStoreService,
    private readonly recordRenderService: RecordRenderService,
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
