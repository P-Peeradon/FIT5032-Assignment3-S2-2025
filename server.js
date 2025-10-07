const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json()); //Allow parsing request body as JSON

// Function for validating fields in forms will be declared here to ensure the conformity of data in this application.

// Validate Username
const validateUsername = () => {
    return body('username').minLength().isAlphanumeric();
};

// Validate Email
const validateEmail = () => {
    return body('email').isEmail().withMessage('Incorrect email format');
};

// Validate Password (Reusable)
const validatePassword = () => {
    return (
        body('password').isLength(10).withMessage('Password must be at least 10 character long.') &&
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
