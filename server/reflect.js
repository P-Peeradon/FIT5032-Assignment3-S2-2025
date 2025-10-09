import { auth, db } from './src/firebase/init.js';
import { doc, addDoc, getDocs, collection, setDoc } from 'firebase/firestore';

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json()); // Parse data in request body as JSON.
app.use(cors);

// get Journals
app.get('/reflect/journal', async (req, res) => {
    if (req.method !== 'GET') {
        res.status(405).send('GET Method only.');
        return;
    }

    const data = { ...req.body };

    if (data.userId !== auth.currentUser.uid) {
        res.status(401).send('You are unauthorised to access user data.');
        return;
    }

    // In case of your are practitioner, you can ask for consent to access journal.
    // If the user get to critic level, practitioner can alert and contact the user.
    if (data.role === 'practitioner') {
        // Wait
    }

    try {
        const userRef = doc(collection(db, 'users'), data.userId);
        const journalSnapshot = await userRef.collection('journals').get();

        const journals = [];

        journalSnapshot.forEach((doc) => {
            journals.push({
                ...doc.data(),
            });
        });

        res.status(200).send(journals);
    } catch (error) {
        res.status(500).send(`Error in getting user journals: ${error.message}`);
    }
});
