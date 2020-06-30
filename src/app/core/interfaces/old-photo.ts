import { LocationStamp } from './location-stamp';

export interface Photo {
    filepath: string;
    webviewPath: string;
    byteString?: string;
    timestamp?: number;
    locationStamp?: LocationStamp;
}