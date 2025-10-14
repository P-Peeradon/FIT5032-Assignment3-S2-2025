import express from 'express';
import multer from 'multer';
import mime from 'mime-types'

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Fetch all communities data.
router.get('/community', async (req, res) => {
    try {
        const response = await axios.get('https://fetchallcommunities-qbseni5s5q-uc.a.run.app');

        const communities = [];

        response.data.forEach((d) => {
            communities.push({ ...d.data() });
        });

        return res.status(200).send(communities);
    } catch (error) {
        console.error(`Failed to fetch communities: ${error}`);
        return res.status(500).send('Failed to fetch communities');
    }
});

// For uploading community thumbnail
router.post('/community/register', upload.single('thumbnail'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('Please upload your file.');
    }

    const file = req.file.buffer;
    const mimeType = req.file.mimetype;
    const base64File = file.toString('base64');

    const data = req.body;
    if (!data.role || data.role != 'Social Worker') {
        return res.status(401).send('You are not allow to edit community data');
    }

    try {
        await axios.post(, {
            file: base64File,
            filename: 'thumbnail' + '.' + mime.extension(mimeType),
            mimetype: mimeType,
            ...data
        })
    } catch (error) {
        return res.status(500).send(`Error in uploading community thumbnail: ${error.message}`);
    }
});

export default router;
