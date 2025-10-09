import * from 'fire.js';

const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json()); //Allow parsing request body as JSON

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
