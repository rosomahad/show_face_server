const express = require('express');
const formidable = require('formidable');

const uuidv1 = require('uuid/v1');
const fs = require('fs');
const path = require('path');

const accessMiddleware = require('../middleware/access.middleware');

const {
    NotFoundError
} = require('../lib/errors.js');

const tmp_folder = path.resolve(__dirname, '../storage/tmp');

const router = express.Router();

router
    .post('/avatars', accessMiddleware, async (req, res, next) => {
        try {
            const form = new formidable.IncomingForm();

            form.parse(req);

            form.on('fileBegin', function (name, file) {
                file.name = uuidv1();

                file.path = tmp_folder + file.name;

                res.json({
                    status: 'success',
                    data: {
                        fileName: file.name,
                    }
                });
            });

        } catch (err) {
            next(err);
        }
    });

module.exports = router;