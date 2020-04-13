import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, mergeMap, tap, take } from 'rxjs/operators';
import { RecordService } from 'src/app/core/services/record.service';
import { MainHeaderComponent } from 'src/app/core/components/main-header/main-header.component';
import { Observable, forkJoin, of } from 'rxjs';
import { Record } from 'src/app/core/interfaces/record';
import { formatDate } from '@angular/common';
import { Symptoms } from 'src/app/core/classes/symptoms';
import { DailyRecord } from 'src/app/core/classes/daily-record';
import { Photo } from 'src/app/core/interfaces/photo';

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
    this.dailyDetail$ = this.recordService.dailyRecords$
      .pipe(
        tap(() => console.log('Triggered!')),
        mergeMap(dailyRecords => {
          return forkJoin([
            of(dailyRecords),
            this.activatedRoute.paramMap.pipe(take(1), map(params => params.get('day'))),
          ]);
        }),
        map(([dailyRecords, day]) => dailyRecords[+day - 1]),
        map(dailyRecord => {
          const dailyDetail = this.createDailyDetail(dailyRecord);
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
              photos: record.photos,
            });
            console.log('Daily Detail Page: pushed recordRows ', dailyDetail.recordRows);
          });
          return dailyDetail;
        }),
        tap(d => console.log('Daily Detail!!!', d)),
      );
  }

  onSegmentChanged(data) {
    this.selectedSegment = data;
  }

  private createDailyDetail(dailyRecord: DailyRecord): DailyDetail {
    const dailyDetail: DailyDetail = {
      date: this.getDate(dailyRecord.date),
      month: this.getMonth(dailyRecord.date),
      day: dailyRecord.dayCount.toString(),
      bt: dailyRecord.getHighestBt(),
      presentedSymptoms: this.getSymptoms(dailyRecord),
      mapDots: [],
      recordRows: [],
    };
    return dailyDetail;
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

  private getSymptoms(dailyRecord: DailyRecord) {
    const symptoms: string[] = [];
    dailyRecord.records.forEach(record => {
      record.symptoms.list
        .filter(symptom => (symptom.present))
        .forEach(symptom => {
          if (!symptoms.includes(symptom.name)) {
            symptoms.push(symptom.name);
          }
        });
    });
    return symptoms;
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
  photos: Photo[];
}
export interface DailyDetail {
  date: string;
  month: string;
  day: string;
  bt: string;
  presentedSymptoms: string[];
  mapDots: MapDot[];
  recordRows: RecordRow[];
}
