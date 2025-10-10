import { auth, db } from '../src/firebase/init.js';
import { doc, getDocs, collection, getDoc } from 'firebase/firestore';

import express from 'express';

const router = express.Router();

const isAuthenticated = (req, res, next) => {
    // **AUTHENTICATION MIDDLEWARE GOES HERE**
    const authHeader = req.headers.authorization;
    // 1. Check for ID Token in headers
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const idToken = authHeader.split(' ')[1];
        req.user = idToken;
        next();
    } else {
        res.status(401).send('Unauthorised access.');
    }

    next();
};

router.get('/features', isAuthenticated, async (req, res) => {
    try {
        const featuresCollection = collection(db, 'features');
        const snapshot = await getDocs(featuresCollection);
        const features = [];

        snapshot.forEach((d) => {
            features.push({
                id: d.id,
                ...d.data(),
            });
        });

        res.status(200).send(features);
    } catch (error) {
        res.status(500).send(`Error fetching function: ${error.message}`);
    }
});

router.get('/user/:uid', isAuthenticated, async (req, res) => {
    const userID = req.params.uid;

    try {
        const usersDocRef = doc(db, 'users', userID);
        const snapshot = await getDoc(usersDocRef);

        if (!snapshot.exists) {
            res.status(404).send('Document does not exists.');
            return;
        }

        res.status(200).json({ id: snapshot.id, ...snapshot.data() });
    } catch (error) {
        res.status(500).send(`Error in getting user state: ${error.message}`);
    }
});

// Method to get all avatar images from.
router.get('/avatar', isAuthenticated, async (req, res) => {
    try {
        const avatarRef = collection(db, 'avatar');
        const snapshot = await getDocs(avatarRef);

        const avatars = [];

        snapshot.forEach((d) => {
            avatars.push({ id: d.id, ...d.data() });
        });

        res.status(200).send(avatars);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
