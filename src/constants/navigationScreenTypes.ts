import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

/*
Specifying undefined means that the route doesn't have params. 
A union type with undefined (e.g. SomeType | undefined) means 
that params are optional.
*/

export type AuthStackParamList = {
    Login: undefined,
    Registration: undefined
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = {
    route: RouteProp<AuthStackParamList, T>;
    navigation: StackNavigationProp<AuthStackParamList, T>;
};

export type BottomTabParamList = {
    Home: undefined
    Profile: undefined
    Forms: undefined,
    Schedule: undefined
};

export type BottomTabScreenProps<T extends keyof BottomTabParamList> = {
  route: RouteProp<BottomTabParamList, T>;
  navigation: BottomTabNavigationProp<BottomTabParamList, T>;
};