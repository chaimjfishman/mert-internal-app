export interface User {
    id: string;
    email: string;
    fullName: string;
    rank: string;
    gradYear: number | null;
    boardPosition: string;
    dateJoinedMERT: string; //TODO: change to date type
    profileImagePath: string; 
    formCompleted: boolean;
    takenAthleticShift: boolean;
    pushToken: string | null;
}

type ShiftType = "type1" | "type2" | "type3"; //TODO: update
export interface Shift {
    userID: string;
    startTime: Date;
    endTime: Date;
    role: ShiftType;
}

export interface Contact {
    name: string;
    phoneNumber: string;
    position: string;
}

export interface Call {
    userID: string;
    dispatched: Date;
    onScene: Date | null;
    tranScene: Date | null;
    completed: Date | null;
}
