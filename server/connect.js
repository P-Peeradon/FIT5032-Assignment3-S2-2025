import express from 'express';
import mime from 'mime-types';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { bucketCid, geoCodeAddress } from './utility.js';
import axios from 'axios';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limit: 100 * (2 ^ 20) });

// Fetch all communities data.
router.get('/community', async (req, res) => {
    try {
        const response = await axios.get('https://fetchallcommunities-qbseni5s5q-uc.a.run.app');

        const communities = [];

        response.data.forEach((community) => {
            communities.push({ ...community });
        });

        return res.status(200).send(communities);
    } catch (error) {
        console.error(`Failed to fetch communities: ${error}`);
        return res.status(500).send('Failed to fetch communities');
    }
});

// For uploading community thumbnail
// Register new community.
router.post('/community/register', upload.single('thumbnail'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('Please upload your file.');
    }

    const file = req.file.buffer;
    const mimeType = req.file.mimetype;
    const base64File = file.toString('base64');

    const data = req.body;
    if (!data.role || data.role != 'Social Worker') {
        return res.status(401).send('You are not allow to create new community.');
    }

    if (
        !data.name ||
        !data.firstname ||
        !data.lastname ||
        !data.location ||
        !data.address ||
        !data.organisation
    ) {
        return res
            .status(400)
            .send('Community name, first name, last name and location are all required.');
    }

    const cid = bucketCid(data.location);
    try {
        await axios.post('https://createcommunity-qbseni5s5q-uc.a.run.app', { cid: cid, ...data });
    } catch (error) {
        return res.status(500).send(`Error in recording new community: ${error.message}`);
    }

    try {
        await axios.post('https://uploadcommunitythumbnail-qbseni5s5q-uc.a.run.app', {
            file: base64File,
            filename: data.cid + '-thumbnail' + '.' + mime.extension(mimeType),
            mimetype: mimeType,
            ...data,
        });

        const filePath = path.join(
            '/public/community/',
            data.cid,
            '-thumbnail',
            '.',
            mime.extension(mimeType)
        );

        await fs.writeSyncFile(filePath, file);
        await geoCodeAddress({ address: data.address, location: data.location }, 'community');
    } catch (error) {
        return res.status(500).send(`Error in uploading community thumbnail: ${error.message}`);
    }

    return res.status(201).send('Successfully created new community.');
});

export default router;
