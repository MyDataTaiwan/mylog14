import { DailySummary } from './daily-summary';

export interface SummaryByDate {
    [key: string]: DailySummary;
}
