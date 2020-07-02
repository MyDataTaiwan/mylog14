import { DailyRecord } from './daily-record';
import { Record } from '../interfaces/record';
import { formatDate } from '@angular/common';

export class DailyRecords {
    list: DailyRecord[];
    startDate: string;
    endDate: string;
    isInitiated: boolean;

    constructor(records?: Record[]) {
        if (records) {
            this.list = this.createDates(records);
            this.startDate = this.list[0].date;
            this.endDate = this.dateDelta(this.startDate, 13);
            this.fillDayCounts();
            this.pushRecords(records);
        }
    }

    createDates(records: Record[]): DailyRecord[] {
        const dates: string[] = [];
        records.forEach(record => {
            const recordDate = this.toDateString(record.timestamp);
            if (!dates.includes(recordDate)) {
                dates.push(recordDate);
            }
        });
        const dailyRecords: DailyRecord[] = [];
        dates.forEach(date => dailyRecords.push(new DailyRecord(date)));
        return dailyRecords;
    }

    fillDayCounts() {
        this.list = this.list.map(dailyRecord => {
            dailyRecord.dayCount = this.dateDiff(this.startDate, dailyRecord.date) + 1;
            return dailyRecord;
        });
    }

    pushRecords(records: Record[]): void {
        records.forEach(record => {
            const recordOnDate = this.list.find(dailyRecord => dailyRecord.date === this.toDateString(record.timestamp));
            if (recordOnDate) {
                this.list[this.list.indexOf(recordOnDate)].records.push(record);
            }
        });
        this.list.forEach(dailyRecord => {
            dailyRecord.records = dailyRecord.records.sort((a, b) => +a.timestamp - +b.timestamp);
        });
    }

    private dateDelta(time: string | number | Date, delta: number) {
        const date = new Date(time);
        const epochTime = date.setDate(date.getDate() + delta);
        return this.toDateString(epochTime);
    }

    private dateDiff(startDate: string, endDate: string): number {
        const timeDiff = (new Date(endDate)).getTime() - (new Date(startDate)).getTime();
        return Math.floor(timeDiff / (86400 * 1000));
    }

    private toDateString(time: number) {
        return formatDate(time, 'yyyy-MM-dd', 'en-us'); // Convert from epoch time to JS timestamp
    }

}
