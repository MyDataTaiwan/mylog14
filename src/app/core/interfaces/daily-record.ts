import { Record } from './record';

export interface DailyRecord {
    date: Date;
    dayCount: number;
    records: Record[];
}
