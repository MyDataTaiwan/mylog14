import { SharedLink } from './shared-link';

export interface UserData {
    firstName: string;
    lastName: string;
    dataTemplateName: string;
    newUser: boolean;
    email?: string;
    uuid?: string;
    dateOfBirth?: string; // ISO 8601
    userId?: string;
    language?: string;
    timezone?: string;
    startDate?: string; // yyyy-MM-dd
    endDate?: string; // yyyy-MM-dd
    uploadHost?: string;
    sharedLinks?: SharedLink[];
}
