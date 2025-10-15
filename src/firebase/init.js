// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const AUTH_DOMAIN = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const APP_ID = import.meta.env.VITE_FIREBASE_APP_ID;
const MEASUREMENT_ID = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: 'fit5032-peeradon-assignment3',
    storageBucket: 'fit5032-peeradon-assignment3.firebasestorage.app',
    messagingSenderId: '212250197257',
    appId: APP_ID,
    measurementId: MEASUREMENT_ID,
};

// Initialize Firebase
export const fireApp = initializeApp(firebaseConfig);

// Authentication and Firestore can be added here.
export const auth = getAuth(fireApp);
export const db = getFirestore(fireApp);

export const storage = getStorage(fireApp);
