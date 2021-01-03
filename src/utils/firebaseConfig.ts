import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

import getEnvVars from '../../environment';
const { 
    REACT_APP_APIKEY, 
    REACT_APP_AUTHDOMAIN, 
    REACT_APP_PID, 
    REACT_APP_SB, 
    REACT_APP_SID, 
    REACT_APP_APPID, 
    REACT_APP_MID
} = getEnvVars();

const firebaseConfig = {
    apiKey: REACT_APP_APIKEY,
    authDomain: REACT_APP_AUTHDOMAIN,
    projectId: REACT_APP_PID,
    storageBucket: REACT_APP_SB,
    messagingSenderId: REACT_APP_SID,
    appId: REACT_APP_APPID,
    measurementId: REACT_APP_MID
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };