import { db } from '../src/firebase/init.js';
import { doc, getDocs, collection, getDoc } from 'firebase/firestore';

import express from 'express';
import { validationResult } from 'express-validator';

const router = express.Router();
const { firebaseAuthValidation, decodeToken } = require('./validation.js');

router.get('/features', firebaseAuthValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(401).send({ errors: errors.array() });
    }

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

router.get('/user/:uid', firebaseAuthValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(401).send({ errors: errors.array() });
    }

    const userID = req.params.uid; //Get from params, but malicious users can send any fake userID.

    if (decodeToken().uid !== userID) {
        return res
            .status(403)
            .send({ message: 'Your are forbidden from requesting other users data.' });
    }

    try {
        const usersDocRef = doc(db, 'users', userID);
        const snapshot = await getDoc(usersDocRef);

        if (!snapshot.exists) {
            res.status(404).send({ message: `User data for ${userID} does not exists.` });
            return;
        }

        res.status(200).send({ id: snapshot.id, ...snapshot.data() });
    } catch (error) {
        res.status(500).send({ message: `Error in getting user state: ${error.message}` });
    }
});

// Method to get all avatar images from.
router.get('/avatar', firebaseAuthValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(401).send({ errors: errors.array() });
    }

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

exports.module = router;
