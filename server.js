import cors from 'cors';
import express from 'express';
import axios from 'axios';
import 'dotenv/config.js';

import validationRoutes from './server/validation.js';
import adminRoutes from './server/admin.js';
import connectRoutes from './server/connect.js';
// import reflectRoutes from './server/reflect.js';
import growRoutes from './server/grow.js';
import { decodeToken, sendEmail } from './server/utility.js';

const app = express();

const fire_apiKey = process.env.VITE_FIREBASE_API_KEY;
const map_apiKey = process.env.VITE_MAPBOX_ACCESS_TOKEN;

const allowedOrigins = [
    // Your Cloudflare Pages/Workers Subdomain
    'https://chillax-corner.pages.dev',
    // Localhost for development (optional)
    'http://localhost:3000',
];

const corsOptions = {
    // 2. Use a function to check the incoming request's Origin header
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        // OR if the origin is in our allowed list
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    // 3. Essential if your client needs to send cookies, session IDs, or Auth headers
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));
app.use(express.json()); //Allow parsing request body as JSON
app.use(express.urlencoded({ extended: true }));

app.use('/validate', validationRoutes);
app.use('/admin', adminRoutes);
app.use('/connect', connectRoutes);
app.use('/grow', growRoutes);
// app.use('/reflect', reflectRoutes);

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

// Send email by sendgrid.
app.post('/register/email', async (req, res) => {
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
