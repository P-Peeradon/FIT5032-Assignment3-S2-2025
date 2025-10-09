import { auth, db } from './src/firebase/init.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, addDoc, getDocs, collection, setDoc } from 'firebase/firestore';
import axios from 'axios';

import express from 'express';
import { body, validationResult } from 'express-validator';

import adminRoutes from './server/admin.js';
import connectRoutes from './server/connect.js';
import growRoutes from './server/grow.js';
import reflectRoutes from './server/reflect.js';

const app = express();
app.use(express.json()); //Allow parsing request body as JSON
const port = 3000;

app.use('/admin', adminRoutes);
app.use('/connect', connectRoutes);
app.use('/grow', growRoutes);
app.use('/reflect', reflectRoutes);

// Function for validating fields in forms will be declared here to ensure the conformity of data in this application.

// Validate Username
const validateUsername = () => {
    return body('username')
        .isLength({ min: 3, max: 15 })
        .withMessage('Username length must be between 3 and 15 characters.')
        .isAlphanumeric()
        .withMessage('Username can contain only alphabet and number.');
};

// Validate Email
const validateEmail = () => {
    return body('email').isEmail().withMessage('Incorrect email format');
};

// Validate Password (Reusable)
const validatePassword = () => {
    return (
        body('password')
            .isLength({ min: 10 })
            .withMessage('Password must be at least 10 character long.') &&
        body('password')
            .custom((value) => {
                return (
                    /[A-Z]/.test(value) &&
                    /[a-z]/.test(value) &&
                    /\d/.test(value) &&
                    /[!@#$%^&*(),.?":{}|<>"]/.test(value)
                );
            })
            .withMessage(
                'Password must contain at least one uppercase, one lowercase, one digit and one special character.',
            )
    );
};

const validateConfirmPassword = () => {
    body('confirmPassword').custom((value, { req }) => {
        return value === req.body.password;
    });
};

// Validate role, as we define only three roles in our website.
const validateRole = () => {
    return body('role').isIn(['user', 'practitioner', 'social worker']);
};

// Validate registration form.
// Method: GET as we request message to ensure error contain.
app.get(
    '/register/validate',
    [
        validateUsername(),
        validateEmail(),
        validatePassword(),
        validateConfirmPassword(),
        validateRole(),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }

        res.status(202); // Not complete as there is step to perform with firebase auth and firestore.
    },
);

// Creating new user by contacting auth.
app.post('/register/auth', async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).send('Allow only POST method.');
    }

    const data = { ...req.body };

    if (!data.email || !data.password) {
        res.status(400).send('Please include your email and password in request data.');
        return;
    }

    try {
        await axios.post('', data); //To cloud
    } catch (error) {
        res.status(500).send(`Error in registering user: ${error.message}`);
        return;
    }

    res.status(201).send({ message: 'Successfully created user successful.' });
});

// Record new user by contacting firestore.
app.post('/register/firestore', async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).send('Allow only POST method.');
        return;
    }

    const data = { ...req.body };
    if (!data.username || !data.email || !data.role) {
        res.status(400).send({ msg: 'Please include your username, email and role in your data.' });
        return;
    }

    try {
        await axios.post('', data);
    } catch (error) {
        res.status(500).send(`Error recording new user: ${error.message}`);
    }

    res.status(201).send({ id: auth.currentUser.uid, msg: 'Record new user successfully.' });
});

app.post('/login', async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).send('Allow only POST method.');
        return;
    }
    const data = { ...req.body };
    if (!data.email || !data.password) {
        res.status(400).send({
            message: 'Invalid login credential. Please include your email and password',
        });
    }

    try {
        await axios.post('', data);

        res.status(200).send({ msg: 'Log in successfully.' });
    } catch (error) {
        res.status(500).send(`Log in error: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});
