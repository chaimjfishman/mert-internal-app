export interface User {
    id: string;
    email: string;
    fullName: string;
    rank: string;
    gradYear: number;
    boardPosition: string;
    dateJoinedMERT: string; //TODO: change to date type
    profileImagePath: string; 
    formCompleted: boolean;
    takenAthleticShift: boolean;
}

export interface Shift {
    userId: string;
    nextShiftStart: string; //TODO: change to date type
    hoursRemaining: number;
}