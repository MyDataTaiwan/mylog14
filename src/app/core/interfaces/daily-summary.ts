import { KeyData } from './key-data';

export interface DailySummary {
    dayCount: number;
    date: string;
    recordsCount: number;
    templateName: string;
    keyData: KeyData;
    imgByteString?: string;
}
