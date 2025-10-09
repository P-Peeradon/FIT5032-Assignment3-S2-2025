import { db } from './src/firebase/init.js';
import { doc, addDoc, getDocs, collection, setDoc } from 'firebase/firestore';

const express = require('express');
const router = express.Router();

router.get('/connect/community', async (req, res) => {
    if (req.method !== 'GET') {
        res.status(405).send('GET Method only.');
        return;
    }

    try {
        const communitiesCollection = collection(db, 'communities');
        const snapshot = await communitiesCollection.getDocs();
        const communities = [];

        snapshot.forEach((doc) => {
            communities.push({
                id: doc.id,
                ...doc.data(),
            });
        });

        res.status(200).send(communities);
    } catch (error) {
        res.status(500).send(`Error in fetching communities: ${error.message}`);
    }
});

module.exports = router;
