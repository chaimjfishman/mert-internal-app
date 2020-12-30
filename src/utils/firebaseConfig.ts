import firebase from 'firebase/app';
import "firebase/auth"
import "firebase/firestore"

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

// apiKey: process.env.REACT_APP_APIKEY,
// authDomain: process.env.REACT_APP_AUTHDOMAIN,
// projectId: process.env.REACT_APP_PID,
// storageBucket: process.env.REACT_APP_SB,
// messagingSenderId: process.env.REACT_APP_SID,
// appId: process.env.REACT_APP_APPID,
// measurementId:process.env.REACT_APP_MID


// apiKey: REACT_APP_APIKEY,
// authDomain: REACT_APP_AUTHDOMAIN,
// projectId: REACT_APP_PID,
// storageBucket: REACT_APP_SB,
// messagingSenderId: REACT_APP_SID,
// appId: REACT_APP_APPID,
// measurementId: REACT_APP_MID

// apiKey: "AIzaSyAfD73yvk2fLKnLYfr9u0PsxR2MtseodXw",
// authDomain: "mert-internal-app.firebaseapp.com",
// projectId: "mert-internal-app",
// storageBucket: "mert-internal-app.appspot.com",
// messagingSenderId: "243243306234",
// appId: "1:243243306234:web:867cf19413d195b7548d43",
// measurementId: "G-VYKW9RZV8V"

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };