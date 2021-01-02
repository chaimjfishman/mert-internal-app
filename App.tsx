import 'react-native-gesture-handler';
import React from 'react'
import { AuthProvider } from "./src/providers/AuthProvider";
import Routes from "./src/Routes";

import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

export default function App() {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
}