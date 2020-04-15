import { Symptoms } from '../classes/symptoms';
import { LocationStamp } from './location-stamp';

export interface DailyCard {
    hasData: boolean;
    day: string;
    month: string;
    date: string;
    bt: string;
    imgSrc: string;
    imgHeight: number;
    presentedSymptoms?: string[];
    locations?: LocationStamp[];
}
