import axios from 'axios';
import express from 'express';
import { sendEmail } from './utility.js';

const router = express.Router();

// get Journals
router.get('/journal', async (req, res) => {
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
        const response = await axios.get('', data); //Cloud ffunction to get user journal.

        return res.status(200).send(response.data);
    } catch (error) {
        res.status(500).send(`Error in getting user journals: ${error.message}`);
    }
});

router.post('/journal', async (req, res) => {
    const data = req.body;

    if (!data.content || !data.topic) {
        res.status(400).send('Please write your content and your check-in place');
    }

    try {
        await axios.post('https://writejournal-qbseni5s5q-uc.a.run.app', data);

        const mail = `
        \tDear, ${data.username}\n

        \tThank you for sharing your journey to use. I hope that you can process what's on your mind and jot down for us.
        \tHere is what you have written to us,

        ${data.content}
        \n

        Take care,
        Chillax Corner

        `;

        // await sendEmail({to: user.email, msh})

        return res.status(201).send('Successfully writing journal.');
    } catch (error) {
        return res.status(500).send(`Error in writing journals: ${error.message}`);
    }
});

export default router;
