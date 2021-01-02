import 'react-native-gesture-handler';
import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { User } from './constants/collectionTypes';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import AuthStackNavigator from './navigation/AuthStackNavigator';
import { AuthContext } from "./providers/AuthProvider";

import * as db from './utils/db';
import { firebase } from './utils/firebaseConfig';

export default function Routes() {

    const { user, login } = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        async function getAuthStateListener() {
            firebase.auth().onAuthStateChanged( async (firebaseUser) => {
                if (firebaseUser) {
                    setLoading(false);
                    try {
                        const userData: User = await db.getUserDocument(firebaseUser.uid);
                        login(userData);
                    } catch (err) {
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