import { auth, db } from '@/firebase/init';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, addDoc, getDocs, collection, setDoc } from 'firebase/firestore';

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json()); // Parse data in request body as JSON.
app.use(cors);

// This file is created to fix problem related to deploying cloud function.
app.post('/register/auth', async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).send('Allow only POST method.');
    }

    const data = { ...req.body };

    if (!data.email || !data.password) {
        res.status(400).send('Please include your email and password in request data.');
    }

    try {
        await createUserWithEmailAndPassword(auth, data.email, data.password);

        res.status(201).send({ msg: 'Successfully created user successful.' });
    } catch (error) {
        res.status(500).send(`Error in registering user: ${error}`);
    }
});

app.post('/register/firestore', async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).send('Allow only POST method.');
        return;
    }

    try {
        const data = { ...req.body };
        if (!data.username || !data.email || !data.role) {
            res.status(400).send('Please include your username, email and role in your data.');
            return;
        }

        const docRef = doc(db, 'users', auth.currentUser.uid);

        const userDocRef = await setDoc(docRef, {
            username: data.username,
            email: data.email,
            role: data.role,
        });

        res.status(201).send({ id: userDocRef.id, msg: 'Record new user successfully.' });
    } catch (error) {
        res.status(500).send(`Error recording new user: ${error.message}`);
    }
});
