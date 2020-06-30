import { Proof } from './proof';
import { LocationStamp } from './location-stamp';
import { Symptoms } from '../classes/symptoms';
import { Photo } from './old-photo';

export interface Record {
    timestamp: number;
    locationStamp?: LocationStamp;
    bodyTemperature?: number;
    bodyTemperatureUnit?: string;
    symptoms?: Symptoms;
    photos: Photo[];
}
