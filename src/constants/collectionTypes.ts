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
    pushToken: string | null;
}

type ShiftType = "type1" | "type2" | "type3";
export interface Shift {
    userId: string;
    startTime: Date;
    endTime: Date;
    shiftType: ShiftType;
}

export interface Contact {
    name: string;
    phoneNumber: string;
    position: string;
}

export interface Call {
    userId: string;
    dispatched: Date;
    onScene: Date | null;
    tranScene: Date | null;
    completed: Date | null;
}
