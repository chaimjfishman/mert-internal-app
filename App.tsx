import 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { AuthProvider } from "./src/providers/AuthProvider";
import { Provider as PaperProvider } from "react-native-paper";
import Routes from "./src/Routes";

import * as notif from './src/utils/notifications'; 


import {decode, encode} from 'base-64';
if (!global.btoa) {  global.btoa = encode };
if (!global.atob) { global.atob = decode };

export default function App() {
    const [expoPushToken, setExpoPushToken] = useState<string>('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
  
    useEffect(() => {
        notif.registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
         // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });
  
        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });
  
        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);

    return (
        <AuthProvider>
            <PaperProvider>
                <Routes />
            </PaperProvider>
        </AuthProvider>
    );
}