import express from 'express';
import { db } from '../src/firebase/init.js';
import { collection, getDocs } from 'firebase/firestore';

const router = express.Router();

router.get('/community', async (req, res) => {
    try {
        const communityRef = collection(db, 'communities');
        const snapshot = await getDocs(communityRef);

        const communities = [];

        snapshot.forEach((d) => {
            communities.push({ id: d.id, ...d.data() });
        });

        return res.status(200).send(communities);
    } catch (error) {
        console.error(`Failed to fetch communities: ${error}`);
        return res.status(500).send('Failed to fetch communities');
    }
});

export default router;
