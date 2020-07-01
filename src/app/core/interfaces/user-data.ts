import { RecordPreset } from '../services/preset.service';

export interface UserData {
    firstName: string;
    lastName: string;
    recordPreset: RecordPreset;
    newUser: boolean;
    email?: string;
    dateOfBirth?: string; // ISO 8601
    userId?: string;
    language?: string;
    timezone?: string;
    startDate?: string; // yyyy-MM-dd
    endDate?: string; // yyyy-MM-dd
    uploadHost?: string;
    generatedUrl?: string;
}
