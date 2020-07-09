import { Injectable } from '@angular/core';

import { Record } from '@core/classes/record';
import { DailySummary } from '@core/interfaces/daily-summary';
import { KeyData } from '@core/interfaces/key-data';
import { RecordsByDate } from '@core/interfaces/records-by-date';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class RecordRenderService {

  constructor(
    private readonly translate: TranslateService,
  ) { }

  createDailySummary(dayCount: number, date: string, records: Record[]): DailySummary {
    return {
      dayCount,
      date,
      dateView: this.getDateView(date),
      recordsCount: records.length,
      templateName: records[0].templateName,
      keyData: this.getKeyData(records),
      imgByteString: '',
    };
  }

  createDailySummaries(recordsByDate: RecordsByDate): DailySummary[] {
    console.log('recordsByDate', recordsByDate);
    const dailySummaries: DailySummary[] = [];
    let dayOneDate: string;
    Object.keys(recordsByDate).forEach(date => {
      if (!dayOneDate) {
        dayOneDate = date;
      }
      const dayCount = this.getDayCount(dayOneDate, date);
      dailySummaries.push(this.createDailySummary(dayCount, date, recordsByDate[date]));
    });
    return dailySummaries.reverse();
  }

  private getDateView(date: string): string {
    // 'yyyy-MM-dd' to 'MM/dd'
    return date.slice(5).replace('-', '/');
  }

  private getDayCount(startDate: string, currentDate: string): number {
    return this.getDateDiff(startDate, currentDate) + 1;
  }

  private getDateDiff(start: string, end: string): number {
    const toTimestamp = (date: string) => (new Date(date)).getTime();
    return Math.floor((toTimestamp(end) - toTimestamp(start)) / (1000 * 3600 * 24));
  }

  private getKeyData(records: Record[]): KeyData {
    if (!records) {
      return;
    }

    // Assert that there is only one field with 'summary' dataClass
    const keyDataField = records[0].fields.find(field => field.isKeyField);
    const dataClass = keyDataField.dataClass;
    const name = keyDataField.name;
    const unit = keyDataField.valueUnit;
    let value = null;

    records.forEach(record => {
      record.fields
      .filter(field => field.isKeyField)
      .filter(field => field.value != null)
      .forEach(field => {
        if (!value) {
          value = field.value;
        } else if (keyDataField.dataClass === 'highest' && field.value > value) {
          value = +field.value;
        } else if (keyDataField.dataClass === 'lowest' && field.value < value) {
          value = +field.value;
        } else if (keyDataField.dataClass === 'accumulated') {
          value += +field.value;
        }
      });
    });

    if (value == null) {
      return null;
    }

    return { dataClass, name, value, unit };
  }
}
