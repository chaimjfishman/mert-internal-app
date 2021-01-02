import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { User } from './src/constants/collectionTypes'
import BottomTabNavigator from './src/navigation/BottomTabNavigator'
import AuthStackNavigator from './src/navigation/AuthStackNavigator'

import * as db from './src/utils/db';
import { firebase } from './src/utils/firebaseConfig';

import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

export default function App() {
    const [loading, setLoading] = useState<boolean>(true)
    const [user, setUser] = useState<User | undefined>(undefined)

    useEffect(() => {
        async function getAuthStateListener() {
            firebase.auth().onAuthStateChanged( async (user) => {
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
            {user ? <BottomTabNavigator extraData={user} /> : <AuthStackNavigator />}
        </NavigationContainer>
    );
}