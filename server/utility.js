import axios from 'axios';
import admin from 'firebase-admin';
import { header } from 'express-validator';

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
    let addressString = '';

    switch (data.location) {
        // Australia
        case 'Melbourne':
        case 'Sydney':
        case 'Adelaide':
            if (address.floor && address.unit) {
                addressString += address.floor + '/' + address.unit + '\n';
            } else if (address.floor) {
                addressString += 'Level ' + address.floor + '\n';
            }
            addressString += address.no + ' ' + address.street + '\n';
            addressString += address.suburb + ' ' + address.state + ' ' + address.postcode + '\n';
            addressString += 'AUSTRALIA';
            break;

        case 'Singapore':
            addressString += address.no + ' ' + address.street + '\n';
            addressString += '#' + address.floor + '-' + address.unit + '\n';
            addressString += 'SINGAPORE' + ' ' + address.postcode;
            break;

        // New Zealand
        case 'Auckland':
            addressString += address.no + ' ' + address.street + '\n';
            addressString += address.suburb + (address.rd ? ' RD' + address.rd : ' ') + '\n';
            addressString += data.location + ' ' + address.postcode + '\n';
            addressString += 'NEW ZEALAND';
            break;
        default:
            return res.status(404).send('cannot determine the exact address format.');
    }

    next();
    return res.status(202).send({ message: 'Complete formatting address', address: addressString });
};

export const hotcodeLoc = (location) => {
    let code;
    switch (location) {
        case 'Melbourne':
            code = 'MEL';
            break;

        case 'Sydney':
            code = 'SYD';
            break;

        case 'Adelaide':
            code = 'ADL';
            break;

        case 'Auckland':
            code = 'AKL';
            break;

        case 'Singapore':
            code = 'SIN';
            break;

        default:
            break;
    }

    return code;
};

export const bucketCid = async (location) => {
    const response = await axios.get('https://fetchallcommunities-qbseni5s5q-uc.a.run.app');
    const bucketList = response.data.map((community) => community.cid);

    let flag = true;
    let cid;
    do {
        cid = hotcodeLoc(location);
        for (let i = 1; i <= 5; i++) {
            cid += Math.floor(Math.random() * 10);
        }

        if (!bucketList.includes(cid)) flag = false;
    } while (flag);

    return cid;
};
