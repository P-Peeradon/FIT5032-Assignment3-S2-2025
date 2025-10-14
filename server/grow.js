import axios from 'axios';
import express from 'express';

const router = express.Router();

// Function to fetch all article
router.get('/education', async (req, res) => {
    const data = req.body;

    try {
        const response = await axios.get('https://fetchallarticles-qbseni5s5q-uc.a.run.app', data);

        const articles = response.data;

        return res.status(200).send(articles);
    } catch (error) {
        console.error(`Failed to fetch communities: ${error}`);
        return res.status(500).send('Failed to fetch communities');
    }
});

export default router;
