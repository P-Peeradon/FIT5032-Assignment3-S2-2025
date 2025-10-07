/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { setGlobalOptions } = require('firebase-functions');
const { onRequest } = require('firebase-functions/https');
const admin = require('firebase-admin');
const { createUserWithEmailAndPassword } = require('firebase/auth');
const { auth } = require('../src/firebase/init');
const cors = require('cors')({ origin: true });
require('dotenv').config();

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
setGlobalOptions({ maxInstances: 10 });

// Create new user in Firebase auth.
// Method: POST
exports.createUser = onRequest((req, res) => {
    cors(req, res, async () => {
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
            res.status(500).send('Error in registering user.');
        }
    });
});

// Record user in Firestore.
// Method: POST
exports.recordUser = onRequest((req, res) => {
    cors(req, res, async () => {
        if (req.method !== 'POST') {
            res.status(405).send('Allow only POST method.');
            return;
        }

        try {
            const usersCollection = admin.firestore().collection('users');
            const data = { ...req.body };
            if (!data.username || !data.email || !data.role) {
                res.status(400).send('Please include your username, email and role in your data.');
                return;
            }

            const userDocRef = await usersCollection.doc(auth.currentUser.uid).set({
                username: data.username,
                email: data.email,
                role: data.role,
            });

            res.status(201).send({ id: userDocRef.id, msg: 'Record new user successfully.' });
        } catch (error) {
            console.error(`Error recording new user: ${error}`);
            res.status(500).send('Error in recording user to database.');
        }
    });
});

// Login the user
// method: POST
exports.loginUser = onRequest((req, res) => {
    cors(req, res, async () => {
        if (req.method !== 'POST') {
            res.status(405).send('Allow only POST method.');
            return;
        }

        try {
            const data = { ...req.body };
            if (!data.email || !data.password) {
                res.status(400).send(
                    'Invalid login credential. Please include your email and password',
                );
            }

            res.status(200).send({ msg: 'Log in successfully.' });
        } catch (error) {
            console.error(`Log in error: ${error}`);
            res.status(500).send('Error in logging in.');
        }
    });
});

// Fetch all features from database.
// Method: GET
exports.getAllFeatures = onRequest((req, res) => {
    cors(req, res, async () => {
        if (req.method !== 'GET') {
            res.status(405).send('GET Method only.');
            return;
        }

        try {
            const featuresCollection = admin.firestore().collection('features');
            const snapshot = await featuresCollection.get();
            const features = [];

            snapshot.forEach((doc) => {
                features.push({
                    ...doc.data(),
                });
            });

            res.status(200).json(features);
        } catch (error) {
            console.error(`Error fetching function: ${error.message}`);
            res.status(500).send('Error counting books.');
        }
    });
});
