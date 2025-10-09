import { db } from './src/firebase/init.js';
import { doc, addDoc, getDocs, collection, setDoc } from 'firebase/firestore';

import express from 'express';
import { Community } from './src/assets/community.js';
const router = express.Router();

router.get('/connect/community', async (req, res) => {
    if (req.method !== 'GET') {
        res.status(405).send('GET Method only.');
        return;
    }

    try {
        const response = await axios.get('');
        const data = await response.json();
        const communities = data.map((obj) => new Community(obj));

        res.status(200).send(communities);
    } catch (error) {
        res.status(500).send(`Error in fetching communities: ${error.message}`);
    }
});

export default router;
