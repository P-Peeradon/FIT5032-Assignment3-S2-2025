import { body, validationResult } from 'express-validator';

import express from 'express';
const router = express.Router();

// Function for validating fields in forms will be declared here to ensure the conformity of data in this application.
// Validate Username
const validateUsername = () => {
    return body('username')
        .isLength({ min: 3, max: 15 })
        .withMessage('Username length must be between 3 and 15 characters.')
        .isAlphanumeric()
        .withMessage('Username can contain only alphabet and number.');
};

// Validate community name
const validateCommunityName = () => {
    return body('name')
        .isString()
        .withMessage('Community name should be a string')
        .isLength({ min: 4 })
        .withMessage('Community name should be at least 4 characters long.');
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
                'Password must contain at least one uppercase, one lowercase, one digit and one special character.'
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
    return body('role')
        .isIn(['user', 'practitioner', 'social worker'])
        .withMessage('Role must be one of the predefined role.');
};

const validateLocation = () => {
    // App scope right now. Will be added later.
    return body('location')
        .isIn(['Melbourne', 'Sydney', 'Adelaide', 'Auckland', 'Singapore'])
        .withMessage('Location unavailable at the moment');
};

const validateName = () => {
    return body('firstname')
        .not()
        .isEmpty()
        .withMessage('Please enter the first name.')
        .isString()
        .isLength({ min: 3, max: 15 })
        .withMessage('Firstname should be between 3 to 15 character.')
        .body('lastname')
        .not()
        .isEmpty()
        .withMessage('Please enter the last name.')
        .isString()
        .isLength({ min: 2 })
        .withMessage('Lastname should be at least 2 characters.');
};

const validateMoods = () => {
    return (
        body('moods').isArray({ min: 1 }).withMessage('Please specify your mood.') &&
        body('moods.*')
            .isIn([
                'Anger',
                'Happy',
                'Joy',
                'Cheerful',
                'Fear',
                'Surprise',
                'Sad',
                'Disgust',
                'Bitter',
            ])
            .withMessage('Moods must be in the listed')
    ); // Validate type to prevent any unwanted type.
};

const validateContent = () => {
    return body('content')
        .not()
        .isEmpty()
        .withMessage('Content should not empty')
        .isLength({ max: 150 })
        .withMessage('Content can contain at most 150 characters');
};

const validateAbbrev = () => {
    return body('abbrev')
        .isString()
        .matches(/[A-Z]{3,6}/)
        .withMessage('Community abbrevation should contains only 3-6 uppercase characters.');
};

// Validate registration form.
// Method: POST
router.post(
    '/register',
    [validateUsername, validateEmail, validatePassword, validateConfirmPassword, validateRole],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).send({ errors: errors.array() });
        }

        res.status(204); // Not complete as there is step to perform with firebase auth and firestore.
    }
);

router.post('/login', [validateEmail, validatePassword], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send({ errors: errors.array() });
    }

    res.status(204); // Not complete as there is step to perform with firebase auth and firestore.
});

router.post(
    '/community/register',
    [validateName, validateCommunityName, validateLocation],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).send({ errors: errors.array() });
        }

        res.status(204);
    }
);

router.post('/journal', [validateUsername, validateMoods, validateContent], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }

    res.status(204); // Not complete as there is step to perform with firebase firestore.
});

export default router;
