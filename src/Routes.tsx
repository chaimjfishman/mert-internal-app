import 'react-native-gesture-handler';
import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { User } from './constants/collectionTypes';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import AuthStackNavigator from './navigation/AuthStackNavigator';
import { AuthContext } from "./providers/AuthProvider";
import { ActivityIndicator, Colors } from 'react-native-paper';


import * as db from './utils/db';
import { firebase } from './utils/firebaseConfig';

export default function Routes() {

    const { user, login } = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function getAuthStateListener() {
            firebase.auth().onAuthStateChanged( async (firebaseUser) => {
                if (firebaseUser) {
                    setLoading(false);
                    try {
                        const userData: User = await db.getUserDocument(firebaseUser.uid);
                        login(userData);
                    } catch (err) {
                        console.log(err);
                    }
                } else {
                    // no user logged in
                    setLoading(false);
                }
            });
        }
        getAuthStateListener();
    }, []);

    if (loading) {
        return (
            <ActivityIndicator animating={true} color={Colors.red800} style={{position: 'absolute', 
                                                                        top: 0, left: 0, right: 0, 
                                                                        bottom: 0, 
                                                                        justifyContent: 'center', 
                                                                        alignItems:"center"}}/>
        );
      }
    else {
        return (
            <NavigationContainer>
                {user ? <BottomTabNavigator /> : <AuthStackNavigator />}
            </NavigationContainer>
        );
    }
}