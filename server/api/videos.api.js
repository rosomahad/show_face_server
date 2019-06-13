const express = require('express');
const path = require('path');
const fs = require('fs');

const accessMiddleware = require('../middleware/access.middleware');

const videosPath = path.resolve(__dirname, '../storage/videos');


const {
    NotFoundError
} = require('../lib/errors.js');

const router = express.Router();

router
    .get('/', accessMiddleware, async (req, res, next) => {
        try {
            // TODO: 
        } catch (err) {
            next(err);
        }
    })

    .get('/:id', accessMiddleware, async (req, res, next) => {
        const videoPath = path.resolve(videosPath, 'video.mp4');
        const stats = fs.statSync(videoPath);

        const fileSize = stats.size;
        const range = req.headers.range;

        try {
            if (range) {
                const parts = range.replace(/bytes=/, '').split('-');
                const start = parseInt(parts[0], 10);
                const end = parts[1]
                    ? parseInt(parts[1], 10)
                    : fileSize - 1;
                const chunksize = (end - start) + 1;
                const file = fs.createReadStream(videoPath, { start, end });
                const head = {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunksize,
                    'Content-Type': 'video/mp4',
                };
                res.writeHead(206, head);
                file.pipe(res);
            } else {
                const head = {
                    'Content-Length': fileSize,
                    'Content-Type': 'video/mp4',
                };
                res.writeHead(200, head);
                fs.createReadStream(videoPath).pipe(res);
            }
        } catch (err) {
            next(err);
        }
    })

    .post('/', accessMiddleware, async (req, res, next) => {
        const values = req.body;

        try {
            // TODO: 

        } catch (err) {
            next(err);
        }
    })

    .put('/', accessMiddleware, async (req, res, next) => {
        const {
            id,
            ...values
        } = req.body;

        try {

            // TODO: 
        } catch (err) {
            next(err);
        }
    })

    .delete('/:id', accessMiddleware, async (req, res, next) => {
        const id = req.params.id;

        try {
            // TODO: 
        } catch (err) {
            next(err);
        }
    });

module.exports = router;