import cors from 'cors';
import express from 'express';

import validationRoutes from './server/validation.js';
import adminRoutes from './server/admin.js';
import connectRoutes from './server/connect.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import admin from 'firebase-admin';

import { auth, db } from './src/firebase/init.js';
import { addDoc, collection } from 'firebase/firestore';
//import growRoutes from './server/grow.js';
//import reflectRoutes from './server/reflect.js';

admin.initializeApp({});

const app = express();

app.use(cors({ origin: true }));
app.use(express.json()); //Allow parsing request body as JSON
app.use(express.urlencoded({ extended: true }));

app.use('/validate', validationRoutes);
app.use('/admin', adminRoutes);
app.use('/connect', connectRoutes);
//app.use('/grow', growRoutes);
//app.use('/reflect', reflectRoutes);

const port = process.env.PORT || 3000;

// Creating new user by contacting auth.
app.post('/register/auth', async (req, res) => {
    const data = req.body;

    if (!data.email || !data.password) {
        res.status(400).send('Please include your email and password in request data.');
        return;
    }

    try {
        await admin.auth().createUser({ email: data.email, password: data.password });

        res.status(201).send({ message: 'Successfully created user.' });
    } catch (error) {
        console.error(`Error in registering new user: ${error}`);

        res.status(500).send('Error in registering user');
    }
});

// Record new user by contacting firestore.
app.post('/register/firestore', async (req, res) => {
    const data = req.body;
    if (!data.username || !data.email || !data.role) {
        res.status(400).send({ msg: 'Please include your username, email and role in your data.' });
        return;
    }

    try {
        const newUserRef = await addDoc(collection(db, 'users'), {
            username: data.username,
            email: data.email,
            role: data.role,
        });

        return res.status(201).send({ id: newUserRef.id, msg: 'Record new user successfully.' });
    } catch (error) {
        console.error(`Error in recording new user: ${error}`);
    }
});

app.post('/login', async (req, res) => {
    const data = req.body;
    if (!data.email || !data.password) {
        res.status(400).send({
            message: 'Invalid login credential. Please include your email and password',
        });
    }

    try {
        await signInWithEmailAndPassword(auth, data.email, data.password);

        res.status(200).send({ msg: 'Log in successfully.' });
    } catch (error) {
        console.error(`Error in login: ${error}`);
        res.status(500).send('Log in failed');
    }
});

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});
