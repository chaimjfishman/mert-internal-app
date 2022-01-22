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
    admin: boolean;
}

export interface shiftMember {
    id: string;
    role: string;
    start: Date;
    end: Date;
    token: string;
}

export interface Shift {
    start: Date;
    end: Date;
    members: Array<shiftMember>;
}

export interface Contact {
    name: string;
    phoneNumber: string;
    position: string;
}

export interface Form {
    title: string;
    url: string;
}

export interface Call {
    userID: string;
    dispatched: Date;
    onScene: Date | null;
    tranScene: Date | null;
    completed: Date | null;
}
