import 'react-native-gesture-handler';
import React, { useState, useRef } from 'react';
import { AuthProvider } from "./src/providers/AuthProvider";
import Routes from "./src/Routes";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';




import {decode, encode} from 'base-64';
if (!global.btoa) {  global.btoa = encode };
if (!global.atob) { global.atob = decode };

export default function App() {


    return (
        <PaperProvider theme = {DefaultTheme}>
        <AuthProvider>
            <PaperProvider>
                <Routes />
            </PaperProvider>
        </AuthProvider>
        </PaperProvider>
    );
}