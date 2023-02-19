import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

import "firebase/database"
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID
};

//export default firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

export const AuthService = getAuth();

export const firebaseInstance = getAuth();

export const dbService = getFirestore();

export const storageService = getStorage();

export const storageRef = ref(storageService, 'images');

