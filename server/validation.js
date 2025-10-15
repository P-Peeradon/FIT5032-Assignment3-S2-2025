import { body, header, validationResult } from 'express-validator';
import admin from 'firebase-admin';
import express from 'express';
const router = express.Router();

// We want to check that client is authorised by Firebase system, as malicious users can send any fake id or any user id by using body.
export const firebaseAuthValidation = () => {
    header('Authorization')
        .exists()
        .withMessage('You are unauthorised to access Chillax Corner.')
        .bail()
        .matches(/^Bearer\s.+$/)
        .withMessage('Authorization header must be in Bearer token format.')
        .bail()
        .custom(async (token, { req }) => {
            const idToken = token.split(' ')[1]; // Extract the token part
            try {
                const decodedToken = await admin.auth().verifyIdToken(idToken);
                req.user = decodedToken; // Attach decoded token to request for later use
                return true;
            } catch (error) {
                console.error(`Error in decoding token: ${error.message}`);
                res.status(400).send('Invalid or expired Firebase ID token');
            }
        });
};

export const decodeToken = async () => {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) {
        return res.status(401).send('No ID token provided.');
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;
        const email = decodedToken.email; // The email will be present if the user signed in with email/password or a provider that provides an email.

        return { uid: uid, email: email };
    } catch (error) {
        console.error(`Error in verifying token: ${error.message}`);
        return res.status(403).send('Unauthorized.');
    }
};

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

// Send status 202 and tell user that process is not completed.
export const formatAddress = (req, res, next) => {
    // Pass
    const data = req.body;

    if (!data.location || !data.address) {
        return res
            .status(400)
            .send('Please provide the location and address as we are not able to format address');
    }

    let address = data.address;
    let addressString;

    switch (data.location) {
        case 'Melbourne':
        case 'Sydney':
        case 'Adelaide':
            addressString = address.no + ' ' +
            break;

        case 'Singapore':
            break;

        case 'Auckland':
            break;
        default:
            return res.status(404).send('cannot determine the exact address format.');
    }
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
    return body('content');
};

// Validate registration form.
// Method: POST
router.post(
    '/register',
    [validateUsername, validateEmail, validatePassword, validateConfirmPassword, validateRole],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }

        res.status(204); // Not complete as there is step to perform with firebase auth and firestore.
    }
);

router.post('/login', [validateEmail, validatePassword], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }

    res.status(204); // Not complete as there is step to perform with firebase auth and firestore.
});

router.post('/journal', [validateUsername, validateMoods, validateContent], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }

    res.status(204); // Not complete as there is step to perform with firebase auth and firestore.
});

export default router;
