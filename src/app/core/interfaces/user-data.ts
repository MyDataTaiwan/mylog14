export interface UserData {
    newUser: boolean;
    eulaAccepted: boolean;
    guideAccepted: boolean;
    uuid?: string;
    language?: string;
    timezone?: string;
    startDate?: string; // yyyy-MM-dd
    endDate?: string; // yyyy-MM-dd
}
