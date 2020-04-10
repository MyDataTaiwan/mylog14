import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { RecordService } from 'src/app/core/services/record.service';
import { MainHeaderComponent } from 'src/app/core/components/main-header/main-header.component';
import { Observable } from 'rxjs';
import { Record } from 'src/app/core/interfaces/record';
import { formatDate } from '@angular/common';
import { Symptoms } from 'src/app/core/classes/symptoms';

@Component({
  selector: 'app-daily-detail',
  templateUrl: './daily-detail.page.html',
  styleUrls: ['./daily-detail.page.scss'],
})
export class DailyDetailPage implements OnInit {
  day: string;
  dailyDetail$ = new Observable<DailyDetail>();
  selectedSegment = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private recordService: RecordService,
  ) { }

  ngOnInit() {
    this.dailyDetail$ = this.activatedRoute.paramMap
      .pipe(
        map(params => params.get('day')),
        switchMap(day => {
          return this.recordService.dailyRecords$
            .pipe(map(dailyRecords => dailyRecords[+day - 1]));
        }),
        map(dailyRecord => {
          const dailyDetail: DailyDetail = {
            date: this.getDate(dailyRecord.date),
            month: this.getMonth(dailyRecord.date),
            day: dailyRecord.dayCount.toString(),
            bt: dailyRecord.getHighestBt(),
            mapDots: [],
            recordRows: [],
          };
          dailyRecord.records.forEach(record => {
            if (record.locationStamp) {
              dailyDetail.mapDots.push({
                latitude: record.locationStamp.latitude,
                longitude: record.locationStamp.longitude,
              });
            }
            dailyDetail.recordRows.push({
              time: this.getTime(record.timestamp),
              bt: this.getBt(record),
              expand: false,
              symptoms: record.symptoms,
            });
          });
          return dailyDetail;
        }),
      );
  }

  onSegmentChanged(data) {
    this.selectedSegment = data;
  }

  private getBt(record: Record) {
    if (!record.bodyTemperature || !record.bodyTemperatureUnit) {
      return 'N/A';
    }
    return record.bodyTemperature + record.bodyTemperatureUnit;
  }

  private getDate(timestamp: string) {
    return formatDate(timestamp, 'dd', 'en-us');
  }

  private getMonth(timestamp: string) {
    return formatDate(timestamp, 'MMMM', 'en-us');
  }

  private getTime(timestamp: string) {
    return formatDate(timestamp, 'HH:mm', 'en-us');
  }

}

export interface MapDot {
  latitude: number;
  longitude: number;
}

export interface RecordRow {
  time: string;
  bt: string;
  symptoms: Symptoms;
  expand: boolean;
}
export interface DailyDetail {
  date: string;
  month: string;
  day: string;
  bt: string;
  mapDots: MapDot[];
  recordRows: RecordRow[];
}
