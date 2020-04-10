import { Symptoms } from './symptoms';
import { Photo } from './photo';
import { LocationStamp } from './location-stamp';

export interface Record {
    timestamp: string;
    locationStamp?: LocationStamp;
    bodyTemperature?: number;
    bodyTemperatureUnit?: string;
    symptoms?: Symptoms;
    photos: Photo[];
}
