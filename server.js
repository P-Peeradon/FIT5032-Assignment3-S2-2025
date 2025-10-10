import { auth, db } from './src/firebase/init.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import 'dotenv/config.js';

import express from 'express';

import validationRoutes from './server/validation.js';
import adminRoutes from './server/admin.js';
import connectRoutes from './server/connect.js';

//import growRoutes from './server/grow.js';
//import reflectRoutes from './server/reflect.js';

const app = express();
app.use(express.json()); //Allow parsing request body as JSON
const port = process.env.PORT || 3000;

app.use('/validate', validationRoutes);
app.use('/admin', adminRoutes);
app.use('/connect', connectRoutes);
//app.use('/grow', growRoutes);
//app.use('/reflect', reflectRoutes);

// Creating new user by contacting auth.
app.post('/register/auth', async (req, res) => {
    const data = req.body;

    if (!data.email || !data.password) {
        res.status(400).send('Please include your email and password in request data.');
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, data.email, data.password); //To cloud
    } catch (error) {
        console.error(`Error in registering new user: ${error}`);
        res.status(500).send('Error in registering user');
    }

    res.status(201).send({ message: 'Successfully created user successful.' });
});

// Record new user by contacting firestore.
app.post('/register/firestore', async (req, res) => {
    const data = req.body;
    if (!data.uid || !data.username || !data.email || !data.role) {
        res.status(400).send({ msg: 'Please include your username, email and role in your data.' });
        return;
    }

    try {
        const docRef = doc(db, 'users', data.uid);
        await setDoc(docRef, {
            username: data.username,
            email: data.email,
            role: data.role,
        });
    } catch (error) {
        console.error(`Error in recording new user: ${error}`);
    }

    res.status(201).send({ id: auth.currentUser.uid, msg: 'Record new user successfully.' });
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
