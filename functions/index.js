/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { setGlobalOptions } = require('firebase-functions');
const { onRequest } = require('firebase-functions/v2/https');
const logger = require('firebase-functions/logger');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();

const authClient = admin.auth();
const firestoreClient = admin.firestore();
const storageClient = admin.storage();

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

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// Record user in Firebase auth.
// Method: POST
exports.createUser = onRequest((req, res) => {
    cors(req, res, async () => {
        if (!authClient || !firestoreClient) {
            res.status(500).send('Services not ready.');
            return;
        }

        const frame = { ...req.body };
        try {
            await authClient.createUser({ email: frame.email, password: frame.password });
        } catch (error) {
            res.status(500).send(`Error in registering user: ${error.message}`);
        }
    });
});

// Record user in Firestore.
// Method: POST
exports.recordUser = onRequest((req, res) => {
    cors(req, res, async () => {
        if (!authClient || !firestoreClient) {
            res.status(500).send('Services not ready.');
            return;
        }

        const frame = { ...req.body };

        if (!frame.uid) {
            res.status(401).send('User ID missing or unauthorized.');
            return;
        }

        try {
            const usersCollection = firestoreClient.collection('users');

            await usersCollection.doc(frame.uid).set({
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
exports.loginUser = onRequest((req, res) => {
    cors(req, res, async () => {
        if (!authClient || !firestoreClient) {
            res.status(500).send('Services not ready.');
            return;
        }

        const frame = { ...req.body };

        try {
            const userRecord = await authClient.getUserByEmail(frame.email);
            const uid = userRecord.uid;
            const customToken = await authClient.createCustomToken(uid);

            res.status(200).json({ customToken: customToken });
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                res.status(401).send('Invalid credentials.');
            } else {
                res.status(500).send(`Log in error: ${error.message}`);
            }
        }
    });
});

// Fetch all features from database.
// Method: GET
exports.getAllFeatures = onRequest((req, res) => {
    cors(req, res, async () => {
        if (!firestoreClient) {
            res.status(500).send('Services not ready.');
            return;
        }

        try {
            const featuresCollection = firestoreClient.collection('features');
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
exports.fetchUserState = onRequest((req, res) => {
    cors(req, res, async () => {
        if (!authClient || !firestoreClient) {
            res.status(500).send('Services not ready.');
            return;
        }

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).send('No Authorization header provided.');
        } // It returns authentication state in the header.

        const idToken = authHeader.split('Bearer ')[1];
        let userId;

        try {
            // Verify the token using the Admin SDK
            const decodedToken = await authClient.verifyIdToken(idToken);
            userId = decodedToken.uid; // Securely get the user's UID
        } catch (error) {
            // Token is invalid, expired, or malformed
            return res.status(401).send('You are unauthorised to access user data.');
        }

        try {
            const usersCollection = firestoreClient.collection('users');
            const docRef = usersCollection.doc(userId);
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
exports.fetchAllCommunities = onRequest((req, res) => {
    cors(req, res, async () => {
        if (!firestoreClient) {
            res.status(500).send('Services not ready.');
            return;
        }

        try {
            const communitiesCollection = firestoreClient.collection('communities');
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

exports.fetchAllArticles = onRequest((req, res) => {
    cors(req, res, async () => {
        if (!firestoreClient) {
            res.status(500).send('Services not ready.');
            return;
        }

        try {
            const articlesCollection = admin.firestore().collection('articles');
            const snapshot = await articlesCollection.get();
            const articles = [];

            snapshot.forEach((doc) => {
                articles.push({ id: doc.id, ...doc.data() });
            });

            return res.status(200).send(articles);
        } catch (error) {
            return res.status(500).send(`Error in fetching avatars: ${error.message}`);
        }
    });
});

exports.fetchAllAvatar = onRequest((req, res) => {
    cors(req, res, async () => {
        if (!firestoreClient) {
            res.status(500).send('Services not ready.');
            return;
        }

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

exports.createCommunity = onRequest((req, res) => {
    cors(req, res, async () => {
        if (req.method !== 'POST') {
            return res.status(404).send('Allow only POST method.');
        }

        if (!firestoreClient) {
            return res.status(500).send('Firestore is currently unavailable.');
        }

        const frame = { ...req.body };

        if (!frame.cid) {
            return res.status(400).send('CID Generation process does not complete.');
        }

        try {
            const communityRef = firestoreClient.collection('communities');
            await communityRef.add(frame);

            return res.status(201).send('Successfully create new community!');
        } catch (error) {
            return res.status(500).send(error);
        }
    });
});

exports.uploadCommunityThumbnail = onRequest((req, res) => {
    cors(req, res, async () => {
        if (req.method !== 'POST' || req.method !== 'PATCH') {
            return res.status(404).send('Allow only POST and PATCH method.');
        }

        if (!storageClient) {
            return res.status(500).send('Storage client does not ready');
        }

        const frame = req.body;
        if (!frame.file || !frame.filename || !frame.mimetype) {
            return res.status(400).send('Please include your image');
        }
        if (!frame.cid) {
            res.status(400).send('Please include your community id.');
        }

        const bucket = storageClient.bucket(); // Use default bucket in storage
        const buffer = Buffer.from(file, 'base64'); // Buffer file from express.js in base64

        const fileRef = bucket.file(`communities/${cid}/${frame.filename}`); // Filepath in Firebase Storage
        try {
            await fileRef.save(buffer, { contentType: frame.mimetype });
        } catch (error) {
            res.status(500).send('Error in uploading to Firebase Storage.');
        }
    });
});
