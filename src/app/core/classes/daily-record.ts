import { Record } from '../interfaces/record';
import { Photo } from '../interfaces/photo';

export class DailyRecord {
    date: string = null;
    dayCount: number = null;
    latestPhoto: string;
    records: Record[] = [];
    constructor(dayCount: number) {
        this.dayCount = dayCount;
    }

    getRecordCount() {
        return this.records.length;
    }

    getHighestBt(): number {
        return Math.max.apply(null, this.records.map(record => record.bodyTemperature));
    }

    getLatestPhoto(): Photo {
        function flatten<T>(arr: T[][]): Array<T> {
            return arr.reduce((flat, next) => flat.concat(next), []);
        }

        const nestedPhotos = this.records.map(record => record.photos);
        const photos = flatten(nestedPhotos);
        console.log('Flattened photo array', photos);
        const latestTimestamp = Math.max.apply(null, photos.map(photo => photo.timetamp));
        return photos.find(photo => photo.timetamp === latestTimestamp);
    }

}
