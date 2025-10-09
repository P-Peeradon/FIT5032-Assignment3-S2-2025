import { auth, db } from './src/firebase/init.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, addDoc, getDocs, collection, setDoc } from 'firebase/firestore';

const express = require('express');
const router = express.Router();

router.get('/admin/features', async (req, res) => {
    if (req.method !== 'GET') {
        res.status(405).send('GET Method only.');
        return;
    }

    try {
        const featuresCollection = collection(db, 'features');
        const snapshot = await featuresCollection.getDocs();
        const features = [];

        snapshot.forEach((doc) => {
            features.push({
                ...doc.data(),
            });
        });

        res.status(200).send(features);
    } catch (error) {
        res.status(500).send(`Error fetching function: ${error.message}`);
    }
});

router.get('/admin/user', async (req, res) => {
    if (req.method !== 'GET') {
        res.status(405).send('GET Method only.');
        return;
    }

    const data = { ...req.body };

    if (data.userId !== auth.currentUser.uid) {
        res.status(401).send('You are unauthorised to access user data.');
        return;
    }

    try {
        const usersCollection = collection(db, 'users');
        const docRef = await usersCollection.doc(data.userId);

        if (!doc.exists) {
            res.status(404).send('Document does not exists.');
            return;
        }

        res.status(200).json({ ...doc.data() });
    } catch (error) {
        res.status(500).send(`Error in getting user state: ${error.message}`);
    }
});

module.exports = router;
