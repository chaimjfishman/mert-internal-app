import 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';
import React, { useState, useRef } from 'react';
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

    return (
        <AuthProvider>
            <PaperProvider>
                <Routes />
            </PaperProvider>
        </AuthProvider>
    );
}