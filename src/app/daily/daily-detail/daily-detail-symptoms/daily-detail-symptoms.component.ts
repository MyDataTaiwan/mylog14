import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { DataStoreService } from 'src/app/core/services/data-store.service';
import { map } from 'rxjs/operators';
import { Record } from 'src/app/core/interfaces/record';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-daily-detail-symptoms',
  templateUrl: './daily-detail-symptoms.component.html',
  styleUrls: ['./daily-detail-symptoms.component.scss'],
})
export class DailyDetailSymptomsComponent implements OnInit {
  @Input() dayCount: number;
  recordViews$: Observable<RecordView[]>;
  isShow = true;
  mockCoughDetail = '5分鐘咳了10次左右';
  mockFeverDetail = '';
  mockRunnyNoseDetail = '';
  mockStuffyNoseDetail = '有點嗅覺失靈';

  cough = false;
  fever = false;
  runnyNose = false;
  stuffyNose = false;
  constructor(
    private dataStore: DataStoreService,
  ) { }

  ngOnInit() {
    this.recordViews$ = this.dataStore.dailyRecords$
      .pipe(
        map(dailyRecords => dailyRecords.list.find(dailyRecord => dailyRecord.dayCount === this.dayCount)),
        map(dailyRecord => dailyRecord.records),
        map(records => records
          .map(record => this.createRecordView(record))
          .filter(recordView => recordView.bt !== undefined)
        ),
      );
  }

  createRecordView(record: Record) {
    const recordView: RecordView = record;
    recordView.expand = false;
    recordView.time = formatDate(record.timestamp, 'HH:mm', 'en-us');
    /*
    if (record.bodyTemperature && record.bodyTemperatureUnit) {
      recordView.bt = `${record.bodyTemperature}${record.bodyTemperatureUnit}`;
    }
    recordView.symptoms.list = recordView.symptoms.list.filter((symptom) => symptom.present === true);
    */
    return recordView;
  }

}

export interface RecordView extends Record {
  expand?: boolean;
  bt?: string;
  time?: string;
}
