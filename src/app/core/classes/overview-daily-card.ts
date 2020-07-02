import { DailyCard } from '../interfaces/daily-card';
import { LocationStamp } from '../interfaces/location-stamp';
import { DailyRecord } from './daily-record';

export class OverviewDailyCard implements DailyCard {
    hasData: boolean;
    day: string;
    month: string;
    date: string;
    bt: string;
    imgSrc: string;
    imgHeight: number;
    imgByteString?: string;
    presentedSymptoms?: string[];
    locations?: LocationStamp[];

    constructor(dailyRecord?: DailyRecord) {
        this.hasData = (dailyRecord.records.length > 0);
        this.imgHeight = 400;
        this.presentedSymptoms = [];
        this.locations = [];
        if (dailyRecord) {
            this.update(dailyRecord);
        }
    }

    update(dailyRecord: DailyRecord) {
        this.day = dailyRecord.dayCount.toString();
        if (dailyRecord.date) {
            this.month = dailyRecord.date.split('-')[1];
            this.date = dailyRecord.date.split('-')[2];
        }
        this.bt = `${dailyRecord.getHighestBt()}`;
        this.imgSrc = dailyRecord.getLatestPhotoPath();
        this.imgByteString = dailyRecord.getLatestPhotoByteString();
        this.locations = dailyRecord.records
            .map(record => record.locationStamp)
            .filter(locationStamp => locationStamp !== undefined);
        this.presentedSymptoms = dailyRecord.records
            .map(record => {
                return record.symptoms.list
                    .filter(symptom => symptom.present === true)
                    .filter(symptom => symptom.ignore === false);
            })
            .reduce((flat, next) => flat.concat(next), []) // Flatten
            .map(symptoms => symptoms.name)
            .filter((v, i, a) => a.indexOf(v) === i); // Unique filter
    }

}
