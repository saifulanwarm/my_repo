import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBDbGlNgrFi8kSC4gOuqqM4SYnrkx6Qv0g",
    authDomain: "front-end-app-76a04.firebaseapp.com",
    projectId: "front-end-app-76a04",
    storageBucket: "front-end-app-76a04.appspot.com",
    messagingSenderId: "353711996882",
    appId: "1:353711996882:web:d2360e45e228a34971920b",
    measurementId: "G-SZD0XRTPY4"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);

export { db, auth };