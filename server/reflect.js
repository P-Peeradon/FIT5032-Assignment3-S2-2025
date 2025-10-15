import axios from 'axios';
import express from 'express';

const router = express.Router();

// get Journals
router.get('/journal', async (req, res) => {
    if (req.method !== 'GET') {
        res.status(405).send('GET Method only.');
        return;
    }

    const data = { ...req.body };

    if (data.userId !== auth.currentUser.uid) {
        res.status(401).send('You are unauthorised to access user data.');
        return;
    }

    // In case of your are practitioner, you can ask for consent to access journal.
    // If the user get to critic level, practitioner can alert and contact the user.
    if (data.role === 'practitioner') {
        // Wait
    }

    try {
        const response = await axios('', data);

        return res.status(200).send(response.data);
    } catch (error) {
        res.status(500).send(`Error in getting user journals: ${error.message}`);
    }
});

export default router;
