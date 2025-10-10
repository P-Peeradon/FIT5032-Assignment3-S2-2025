/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { setGlobalOptions } from 'firebase-functions/v2';
import { onRequest } from 'firebase-functions/https';
import admin from 'firebase-admin';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../src/firebase/init.js';
import cors from 'cors';
import { doc } from 'firebase/firestore';

admin.initializeApp();

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ region: 'us-central1', maxInstances: 10 });

// Cloud function will handle only auth and firestore service connection.
// The code will not located in server.js;

// Create new user in Firebase auth.
// Method: POST
export const createUser = onRequest((req, res) => {
    cors(req, res, async () => {
        const frame = { ...req.body };
        try {
            await createUserWithEmailAndPassword(auth, frame.email, frame.password);
        } catch (error) {
            res.status(500).send(`Error in registering user: ${error.message}`);
        }
    });
});

// Record user in Firestore.
// Method: POST
export const recordUser = onRequest((req, res) => {
    cors(req, res, async () => {
        const frame = { ...req.body };

        try {
            const usersCollection = admin.firestore().collection('users');

            const userDocRef = await usersCollection.doc(auth.currentUser.uid).set({
                username: frame.username,
                email: frame.email,
                role: frame.role,
            });
        } catch (error) {
            res.status(500).send(`Error recording new user: ${error.message}`);
        }
    });
});

// Login the user
// method: POST
export const loginUser = onRequest((req, res) => {
    cors(req, res, async () => {
        const frame = { ...req.body };

        try {
            await signInWithEmailAndPassword(auth, frame.email, frame.password);
        } catch (error) {
            res.status(500).send(`Log in error: ${error.message}`);
        }
    });
});

// Fetch all features from database.
// Method: GET
export const getAllFeatures = onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            const featuresCollection = admin.firestore().collection('features');
            const snapshot = await featuresCollection.get();
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
});

// Get the user data with the request id
// method: GET
export const fetchUserState = onRequest((req, res) => {
    cors(req, res, async () => {
        const frame = { ...req.body };

        if (frame.userId !== auth.currentUser.uid) {
            res.status(401).send('You are unauthorised to access user data.');
            return;
        }

        try {
            const usersCollection = admin.firestore().collection('users');
            const docRef = usersCollection.doc(frame.userId);
            const doc = await docRef.get();

            if (!doc.exists) {
                res.status(404).send('Document does not exists.');
                return;
            }

            res.status(200).send({ ...doc.data() });
        } catch (error) {
            res.status(500).send(`Error in getting user state: ${error.message}`);
        }
    });
});

// Fetch all communities stored in the system.
// Method: GET
export const fetchAllCommunities = onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            const communitiesCollection = admin.firestore().collection('communities');
            const snapshot = await communitiesCollection.get();
            const communities = [];

            snapshot.forEach((doc) => {
                communities.push({
                    ...doc.data(),
                });
            });

            res.status(200).send(communities);
        } catch (error) {
            res.status(500).send(`Error in fetching communities: ${error.message}`);
        }
    });
});

export const fetchAllAvatar = onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            const avatarsCollection = admin.firestore().collection('avatars');
            const snapshot = await avatarsCollection.get();
            const avatars = [];

            snapshot.forEach((doc) => {
                avatars.push({ id: doc.id, ...doc.data() });
            });

            res.status(200).send(avatars);
        } catch (error) {
            res.status(500).send(`Error in fetching avatars: ${error.message}`);
        }
    });
});
