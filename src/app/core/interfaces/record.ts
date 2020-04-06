import { Symptoms } from './symptoms';
import { PhotoRecord } from './photo-record';
import { LocationStamp } from './location-stamp';

export interface Record {
    timestamp: string;
    locationStamp?: LocationStamp;
    bodyTemperature?: number;
    bodyTemperatureUnit?: string;
    symptoms?: Symptoms;
    photos?: PhotoRecord[];
}
