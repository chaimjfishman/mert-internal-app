import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen/RegistrationScreen';
import { AuthStackParamList } from '../constants/navigationScreenTypes';

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthStackNavigator(props: any) {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                options={{
                    headerTitle: "Sign In"
                }}
                name="Login"
                component={LoginScreen}
            />
            <Stack.Screen
                options={{
                    headerTitle: "Sign Up"
                }}
                name="Registration"
                component={RegistrationScreen}
            />
        </Stack.Navigator>
    );
};
