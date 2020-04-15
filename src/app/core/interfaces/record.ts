import { Symptoms } from '../classes/symptoms';
import { Photo } from './photo';
import { LocationStamp } from './location-stamp';

export interface Record {
    timestamp: number;
    locationStamp?: LocationStamp;
    bodyTemperature?: number;
    bodyTemperatureUnit?: string;
    symptoms?: Symptoms;
    photos: Photo[];
}
