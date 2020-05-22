import { Component, OnInit, Input, HostListener } from '@angular/core';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { Observable, forkJoin } from 'rxjs';
import { OverviewDailyCard } from 'src/app/core/classes/overview-daily-card';
import { map, tap } from 'rxjs/operators';
import { LocationStamp } from 'src/app/core/interfaces/location-stamp';

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
  card$: Observable<OverviewDailyCard>;

  constructor(
    public dataStore: DataStoreService,
  ) { }

  ngOnInit() {
    this.card$ = this.dataStore.overviewCards$
      .pipe(
        map(cards => cards.find(card => +card.day === this.dayCount)),
        tap(card => this.updateMapUrl(card.locations)),
      );
  }

  onClickOutside() {
    if (this.selectedSymptoms) {
      this.selectedSymptoms = !this.selectedSymptoms;
    }
  }

  updateMapUrl(locations: LocationStamp[]): void {
    if (locations.length < 1) {
      this.isShowMap = false;
      return;
    }
    const lat = locations[locations.length - 1].latitude;
    const lon = locations[locations.length - 1].longitude;
    this.url = this.baseUrl + `${lat},${lon}`;
    this.isShowMap = true;
  }

}
