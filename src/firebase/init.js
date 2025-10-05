// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: 'fit5032-peeradon-assignment3',
    storageBucket: 'fit5032-peeradon-assignment3.firebasestorage.app',
    messagingSenderId: '212250197257',
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MESSENGER_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
