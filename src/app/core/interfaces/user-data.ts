export interface UserData {
    firstName: string;
    lastName: string;
    email?: string;
    dateOfBirth?: string; // ISO 8601
    newUser: boolean;
    eulaAccepted: boolean;
    guideAccepted: boolean;
    uuid?: string;
    language?: string;
    timezone?: string;
    startDate?: string; // yyyy-MM-dd
    endDate?: string; // yyyy-MM-dd
}
