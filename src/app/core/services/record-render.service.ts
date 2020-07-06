import { Injectable } from '@angular/core';

import { Record } from '@core/classes/record';
import { DailySummary } from '@core/interfaces/daily-summary';
import { RecordsByDate } from '@core/interfaces/records-by-date';

@Injectable({
  providedIn: 'root'
})
export class RecordRenderService {

  constructor() { }

  createDailySummary(dayCount: number, date: string, records: Record[]): DailySummary {
    return {
      dayCount,
      date,
      dateView: this.getDateView(date),
      recordsCount: records.length,
      templateName: records[0].templateName,
      dataSummaries: this.getDataSummaries(records),
      imgByteString: '',
    };
  }

  createDailySummaries(recordsByDate: RecordsByDate): DailySummary[] {
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

  private getDataSummaries(records: Record[]) {
    const summary = {};
    records.forEach(record => {
      if (!record.fields) {
        return;
      }
      record.fields.filter(field => field.dataClass.includes('summary'))
        .filter(field => (field.value))
        .forEach(field => {
          if (!summary[field.name]) {
            summary[field.name] = field;
          } else if (field.dataClass.includes('showHighest')) {
            if (summary[field.name].value < field.value) {
              summary[field.name] = field;
            }
          } else if (field.dataClass.includes('showLowest')) {
            if (summary[field.name].value > field.value) {
              summary[field.name] = field;
            }
          } else if (field.dataClass.includes('accumulation')) {
            if (!summary[field.name]) {
              summary[field.name] = field;
            } else {
              summary[field.name].value += field.value;
            }
          }
        });
    });
    return summary;
  }
}
