export interface UserData {
    firstName: string;
    lastName: string;
    email?: string;
    dateOfBirth?: Date;
    newUser: boolean;
    eulaAccepted: boolean;
    uuid?: string;
    language?: string;
    timezone?: string;
    startDate?: string; // yyyy-MM-dd
    endDate?: string; // yyyy-MM-dd
}
