 import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import getEnvVars from '../../environment';

// Super janky way of using environment.js in testing and process.env elsewhere. Fix this formally

let REACT_APP_APIKEY = process.env.REACT_APP_APIKEY
let REACT_APP_AUTHDOMAIN = process.env.REACT_APP_AUTHDOMAIN
let REACT_APP_PID = process.env.REACT_APP_PID
let REACT_APP_SB = process.env.REACT_APP_SB
let REACT_APP_SID = process.env.REACT_APP_SID
let REACT_APP_APPID = process.env.REACT_APP_APPID
let REACT_APP_MID = process.env.REACT_APP_MID

if (process.env.REACT_APP_APIKEY == null) {
    console.log("loading vars from environment.js")
    const envs = getEnvVars();
    REACT_APP_APIKEY = envs.REACT_APP_APIKEY
    REACT_APP_AUTHDOMAIN = envs.REACT_APP_AUTHDOMAIN
    REACT_APP_PID = envs.REACT_APP_PID
    REACT_APP_SB = envs.REACT_APP_SB
    REACT_APP_SID = envs.REACT_APP_SID
    REACT_APP_APPID = envs.REACT_APP_APPID
    REACT_APP_MID = envs.REACT_APP_MID
}

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