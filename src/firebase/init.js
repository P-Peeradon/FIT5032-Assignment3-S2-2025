// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import 'dotenv/config';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || import.meta.env.VITE_FIREBASE_API_KEY,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID || import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket:
        process.env.VITE_FIREBASE_STORAGE_BUCKET || import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:
        process.env.VITE_FIREBASE_MESSAGING_SENDER_ID ||
        import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID || import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId:
        process.env.VITE_FIREBASE_MESSENGER_ID || import.meta.env.VITE_FIREBASE_MESSENGER_ID,
};

// Initialize Firebase
export const fireApp = initializeApp(firebaseConfig);

// Authentication and Firestore can be added here.
export const auth = getAuth(fireApp);
export const db = getFirestore(fireApp);
