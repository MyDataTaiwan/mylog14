import { Record } from './record';

export interface DailyRecord {
    date: string;
    countdown: number;
    records: Record[];
}
