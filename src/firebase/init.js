// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: 'fit5032-peeradon-assignment3',
    storageBucket: 'fit5032-peeradon-assignment3.firebasestorage.app',
    messagingSenderId: '212250197257',
    appId: process.env.VITE_FIREBASE_APP_ID,
    measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const fireApp = initializeApp(firebaseConfig);

// Authentication and Firestore can be added here.
export const auth = getAuth(fireApp);
export const db = getFirestore(fireApp);

export const storage = getStorage(fireApp);
