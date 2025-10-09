import { auth, db } from './src/firebase/init.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, addDoc, getDocs, collection, setDoc } from 'firebase/firestore';

const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json()); //Allow parsing request body as JSON
const port = 3000;

const adminRoutes = require('./server/admin.js');
const connectRoutes = require('./server/connect.js');
const growRoutes = require('./server/grow.js');
const reflectRoutes = require('./server/reflect.js');

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
    }

    try {
        await createUserWithEmailAndPassword(auth, data.email, data.password);

        res.status(201).send({ msg: 'Successfully created user successful.' });
    } catch (error) {
        res.status(500).send(`Error in registering user: ${error}`);
    }
});

// Record new user by contacting firestore.
app.post('/register/firestore', async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).send('Allow only POST method.');
        return;
    }

    try {
        const data = { ...req.body };
        if (!data.username || !data.email || !data.role) {
            res.status(400).send('Please include your username, email and role in your data.');
            return;
        }

        const docRef = doc(db, 'users', auth.currentUser.uid);

        const userDocRef = await setDoc(docRef, {
            username: data.username,
            email: data.email,
            role: data.role,
        }); // If no document with the specific id exists, setDoc() creates new doc with that docID in that collection.

        res.status(201).send({ id: userDocRef.id, msg: 'Record new user successfully.' });
    } catch (error) {
        res.status(500).send(`Error recording new user: ${error.message}`);
    }
});

app.post('/login', async (req, res) => {
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

        await signInWithEmailAndPassword(auth, data.email, data.password);

        res.status(200).send({ msg: 'Log in successfully.' });
    } catch (error) {
        res.status(500).send(`Log in error: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});
