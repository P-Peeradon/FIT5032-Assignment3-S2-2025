// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
    browserSessionPersistence,
    getAuth,
    setPersistence,
    GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
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
export const googleAuth = new GoogleAuthProvider();

setPersistence(auth, browserSessionPersistence)
    .then(() => {
        console.log('Firebase persistence set successfully.');
        // Initialization is complete, now you can expose 'auth'
    })
    .catch((error) => {
        // Handle error if storage is unavailable (e.g., private browsing)
        console.error('Could not set default persistence:', error);
    });
