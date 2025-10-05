// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: 'fit5032-peeradon-assignment3.firebaseapp.com',
    projectId: 'fit5032-peeradon-assignment3',
    storageBucket: 'fit5032-peeradon-assignment3.firebasestorage.app',
    messagingSenderId: '212250197257',
    appId: process.env.APP_ID,
    measurementId: process.env.MESSENGER_ID,
};

// Initialize Firebase
const firebaseUtil = initializeApp(firebaseConfig);
const auth = getAuth(firebaseUtil);
const db = getFirestore(firebaseUtil);

export { auth, db };
