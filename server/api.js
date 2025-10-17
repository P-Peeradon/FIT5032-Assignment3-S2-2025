import express from 'express';
import axios from 'axios';

const router = express.Router();

import validationRoutes from './server/validation.js';
import adminRoutes from './server/admin.js';
import connectRoutes from './server/connect.js';
import reflectRoutes from './server/reflect.js';
import growRoutes from './server/grow.js';

router.use('/validate', validationRoutes);
router.use('/admin', adminRoutes);
router.use('/connect', connectRoutes);
router.use('/grow', growRoutes);
router.use('/reflect', reflectRoutes);

// Creating new user by contacting auth.
router.post('/register/auth', async (req, res) => {
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
router.post('/register/firestore', decodeToken, async (req, res) => {
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

// Send email by sendgrid.
router.post('/register/email', async (req, res) => {
    const data = req.body;

    if (!data.email || !data.username) {
        return res.status(400).send('Invalid mail recipient.');
    }

    const message = `Dear ${data.username},\n
        \tWelcome to Chillax Corner, where youths feel happy and safe. You are welcome to use our inclusive, secure and confidential services. If there is any assistance need, please let me know.\n
        \tWish you all the best in our community.\n

        Warm Welcome,\n
        Chillax Corner Team
    `;

    try {
        await sendEmail({
            to: data.email,
            text: message,
            subject: 'Welcome to Chillax Corner',
        });

        return res.status(200).send('Send Email Complete.');
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.post('/login', async (req, res) => {
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

export default router;
