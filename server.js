import cors from 'cors';
import express from 'express';
import axios from 'axios';
import multer from 'multer';

import validationRoutes from './server/validation.js';
import adminRoutes from './server/admin.js';
import connectRoutes from './server/connect.js';
import reflectRoutes from './server/reflect.js';
import growRoutes from './server/grow.js';

import { decodeToken } from './server/validation.js';

const app = express();

app.use(cors({ origin: true }));
app.use(express.json()); //Allow parsing request body as JSON
app.use(express.urlencoded({ extended: true }));
const upload = multer({ storage: multer.memoryStorage() });

app.use('/validate', validationRoutes);
app.use('/admin', adminRoutes);
app.use('/connect', connectRoutes);
app.use('/grow', growRoutes);
app.use('/reflect', reflectRoutes);

const port = process.env.PORT || 3000;

// Creating new user by contacting auth.
app.post('/register/auth', async (req, res) => {
    const data = req.body;

    if (!data.email || !data.password) {
        res.status(400).send('Please include your email and password in request data.');
        return;
    }

    try {
        await axios.post('https://createuser-qbseni5s5q-uc.a.run.app', data);

        res.status(201).send({ message: 'Successfully created user.' });
    } catch (error) {
        console.error(`Error in registering new user: ${error}`);

        res.status(500).send('Error in registering user');
    }
});

// Record new user by contacting firestore.
app.post('/register/firestore', decodeToken, async (req, res) => {
    const data = req.body;
    const uid = decodeToken().uid;
    if (!data.username || !data.email || !data.role) {
        res.status(400).send({ msg: 'Please include your username, email and role in your data.' });
        return;
    }

    try {
        await axios.post('https://recorduser-qbseni5s5q-uc.a.run.app', { uid: uid, ...data });

        return res.status(201).send({ msg: 'Record new user successfully.' });
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
        await axios.post('https://loginuser-qbseni5s5q-uc.a.run.app', data);

        res.status(200).send({ msg: 'Log in successfully.' });
    } catch (error) {
        console.error(`Error in login: ${error}`);
        res.status(500).send('Log in failed');
    }
});

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});
