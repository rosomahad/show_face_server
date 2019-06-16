const express = require('express');

const accessMiddleware = require('../middleware/access.middleware');
const { channelsController } = require('../controllers');


const {
    NotFoundError,
    WrongParametersError,
} = require('../lib/errors.js');

const router = express.Router();

router
    .get('/', accessMiddleware, async (req, res, next) => {
        try {
            const { rows, count } = await channelsController.findByQuery();

            res.json({
                status: 'error',
                code: 200,
                data: {
                    rows,
                    count
                }
            });
        } catch (err) {
            next(err);
        }
    })

    .get('/:id', accessMiddleware, async (req, res, next) => {
        const id = req.params.id;

        try {
            const result = await channelsController.findById(id);

            if (result) {
                res.json({
                    data: result,
                    status: 'success',
                    code: 200
                });
            } else {
                throw new NotFoundError();
            }

        } catch (err) {
            next(err);
        }
    })

    .post('/', accessMiddleware, async (req, res, next) => {
        const values = req.body;

        const user = req.session.user;

        try {
            if (!user) {
                throw new WrongParametersError();
            }

            const userId = user.id;

            await channelsController.create(userId, values);

            res.json({
                status: 'success',
                code: 200
            });

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
            await channelsController.updateById(id, values);

            res.json({
                status: 'success',
                code: 200
            });
        } catch (err) {
            next(err);
        }
    })

    .delete('/:id', accessMiddleware, async (req, res, next) => {
        const id = req.params.id;

        try {
            await channelsController.deleteById(id);

            res.json({
                status: 'success',
                code: 200
            });
        } catch (err) {
            next(err);
        }
    });

module.exports = router;