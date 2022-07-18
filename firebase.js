// Import the functions you need from the SDKs you need
import { initializeApp , getApp, getApps} from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDikRFLGaoqZ8nr-DCgiTpiHA7hkR0Uc7o",
    authDomain: "discordv2-dbf5c.firebaseapp.com",
    projectId: "discordv2-dbf5c",
    storageBucket: "discordv2-dbf5c.appspot.com",
    messagingSenderId: "36937704828",
    appId: "1:36937704828:web:c88ef20829b43c6570b0f9"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp() ;
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider;

export {app,db,provider,auth}
