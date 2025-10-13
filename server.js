require('dotenv').config();
const cors = require('cors');
const express = require('express');
const axios = require('axios');

import validationRoutes from './server/validation.js';
import adminRoutes from './server/admin.js';
import connectRoutes from './server/connect.js';
//import growRoutes from './server/grow.js';
//import reflectRoutes from './server/reflect.js';

const app = express();
app.use(express.json()); //Allow parsing request body as JSON
app.use(cors({ origin: true }));
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
        await axios.post('https://createuser-qbseni5s5q-uc.a.run.app', data);

        res.status(201).send({ message: 'Successfully created user.' });
    } catch (error) {
        console.error(`Error in registering new user: ${error}`);

        if (error.response) {
            // Log the external error response details (optional, but helpful)
            console.error(`External Service Status: ${error.response.status}`);

            // Forward the external status code and data to the client
            // This is the cleanest way to handle business logic errors from the microservice.
            // Using 'return' ensures we exit immediately.
            return res.status(error.response.status).json(
                error.response.data || {
                    error: `Registration failed with status: ${error.response.status}`,
                    details: 'See logs for external service error.',
                }
            );
        }

        res.status(500).send('Error in registering user');
        return;
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
        await axios.post('https://recorduser-qbseni5s5q-uc.a.run.app', data);
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
