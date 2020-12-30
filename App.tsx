import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, RegistrationScreen } from './src/screens'

import { User } from './types'
import BottomTabNavigator from './src/navigation/BottomTabNavigator'
import * as db from './src/utils/db';
import * as auth from './src/utils/auth';
import { firebase } from './src/utils/firebaseConfig';

import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }


const Stack = createStackNavigator();

export default function App() {
    const [loading, setLoading] = useState<boolean>(true)
    const [user, setUser] = useState<User | undefined>(undefined)

    useEffect(() => {
        async function getAuthStateListener() {
            firebase.auth().onAuthStateChanged( async (user: any) => {
                if (user) {
                    try {
                        const userData: User = await db.getUserDocument(user.uid);
                        setLoading(false);
                        setUser(userData)
                    } catch (err) {
                        setLoading(false);
                        alert(err);
                    }
                } else {
                    // no user logged in
                    setLoading(false);
                }
            });
        }
        getAuthStateListener();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                { user ? (
                    <Stack.Screen name="MERT">
                        {props => <BottomTabNavigator {...props} extraData={user} />}
                    </Stack.Screen>
                ) : (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Registration" component={RegistrationScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
