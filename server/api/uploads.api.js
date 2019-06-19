const express = require('express');
const formidable = require('formidable');

const uuidv1 = require('uuid/v1');
const fs = require('fs');
const path = require('path');

const accessMiddleware = require('../middleware/access.middleware');

const {
    WrongParametersError
} = require('../lib/errors.js');

const tmp_folder = path.resolve(__dirname, '../storage/tmp/');

const router = express.Router();

const AVATAR_IMG_CONFIGS = {
    maxFileSize: 200 * 1024 * 1024,
};

router
    .post('/avatars', async (req, res, next) => {

        const form = new formidable.IncomingForm();

        Object.assign(AVATAR_IMG_CONFIGS, form);

        form.on('fileBegin', function (name, file) {

            const extension = file.name.split('.').pop();

            const uid = uuidv1();

            file.name = `${uid}.${extension}`;

            file.path = path.resolve(tmp_folder, file.name);
        });

        form.parse(req, function (err, fields, files) {
            if (err) next(err);

            if (files['']) {
                const file = files[''];
                const mimeType = file.type;

                if (mimeType === 'image/jpeg' || mimeType === 'image/png') {
                    res.json({
                        status: 'success',
                        data: {
                            fileName: tmp_folder + file.name
                        }
                    });
                } else {
                    fs.unlink(path.resolve(file.path), () => {
                        res.json({
                            status: 'error',
                            message: 'Wrong file format'
                        });
                    });
                }
            }
        });
    });

module.exports = router;