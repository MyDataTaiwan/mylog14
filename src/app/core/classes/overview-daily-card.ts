import { DailyCard } from '../interfaces/daily-card';
import { Symptoms } from './symptoms';
import { LocationStamp } from '../interfaces/location-stamp';
import { DailyRecord } from './daily-record';
import { Symptom } from './symptom';

export class OverviewDailyCard implements DailyCard {
    hasData: boolean;
    day: string;
    month: string;
    date: string;
    bt: string;
    imgSrc: string;
    imgHeight: number;
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
        this.locations = dailyRecord.records
            .map(record => record.locationStamp)
            .filter(locationStamp => locationStamp !== undefined);
        this.presentedSymptoms = dailyRecord.records
            .map(record => {
                return record.symptoms.list
                    .filter(symptom => symptom.present === true);
            })
            .reduce((flat, next) => flat.concat(next), []) // Flatten
            .filter((v, i, a) => a.indexOf(v) === i) // Unique filter
            .map(symptoms => symptoms.name);
    }

}
