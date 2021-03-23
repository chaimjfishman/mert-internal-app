import 'react-native-gesture-handler';
import React, { useState, useRef } from 'react';
import { AuthProvider } from "./src/providers/AuthProvider";
import Routes from "./src/Routes";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';




import {decode, encode} from 'base-64';
if (!global.btoa) {  global.btoa = encode };
if (!global.atob) { global.atob = decode };

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: 'blue',
      accent: 'crimson',
    },
  };

export default function App() {


    return (
        <PaperProvider theme = {theme}>
        <AuthProvider>
            <PaperProvider theme = {theme}>
                <Routes />
            </PaperProvider>
        </AuthProvider>
        </PaperProvider>
    );
}