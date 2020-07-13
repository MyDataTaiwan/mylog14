import { Component, Input, OnInit } from '@angular/core';

import { map } from 'rxjs/operators';

import { Record } from '@core/classes/record';
import { RecordFieldType } from '@core/enums/record-field-type.enum';
import { DataStoreService } from '@core/services/store/data-store.service';

@Component({
  selector: 'app-daily-records',
  templateUrl: './daily-records.component.html',
  styleUrls: ['./daily-records.component.scss'],
})
export class DailyRecordsComponent implements OnInit {
  @Input() date: string;
  selected: number;

  records$ = this.dataStore.recordsByDate$
    .pipe(
      map(recordsByDate => recordsByDate[this.date]),
    );

  constructor(
    private readonly dataStore: DataStoreService,
  ) { }

  ngOnInit() {
  }

  getFieldsCount(record: Record): number {
    return record.fields.filter(field => (field.value !== null && field.value !== '')).length;
  }

  getFirstSummaryField(record: Record) {
    return record.fields.find(field => field.isKeyField);
  }

  getAvailableFields(record: Record) {
    return record.fields.filter(field =>
      field.type !== RecordFieldType.photo && field.value != null && field.value !== '' && field.value !== false
    );
  }

  isSelected(record: Record): boolean {
    return (record.timestamp === this.selected);
  }

  selectRecord(record?: Record): void {
    if (!record) {
      this.selected = null;
      return;
    }
    this.selected = record.timestamp;
  }

}
