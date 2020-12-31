import { RouteProp } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

// ============================ Navigation  ============================

/*
Specifying undefined means that the route doesn't have params. 
A union type with undefined (e.g. SomeType | undefined) means 
that params are optional.
*/
export type BottomTabParamList = {
    Home: { extraData: User },
    Profile: { extraData: User },
    Forms: undefined,
    Schedule: undefined
};

export type BottomTabScreenProps<T extends keyof BottomTabParamList> = {
  route: RouteProp<BottomTabParamList, T>;
  navigation: BottomTabNavigationProp<BottomTabParamList, T>;
  extraData: User
};

// ============================ Firebase Collections ============================
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

