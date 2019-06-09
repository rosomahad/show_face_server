const express = require('express');

const {
    User
} = require('../database');

const {
    usersController
} = require('../controllers');

const accessMiddleware = require('../middleware/access.middleware');

const {
    getListQuery
} = require('../lib/querySelectors');

const {
    NotFoundError
} = require('../lib/errors.js');

const router = express.Router();

router
    .get('/', accessMiddleware, async (req, res, next) => {
        const query = getListQuery(req);

        try {
            const result = await User.findAndCountAll(query);

            return res.json({
                data: {
                    rows: result.rows,
                    total: result.count,
                    limit: query.limit,
                    offset: query.offset,
                    page: Math.floor(query.offset / query.limit),
                },
                status: 'success',
                code: 200
            });

        } catch (err) {
            next(err);
        }
    })

    .get('/:id', accessMiddleware, async (req, res, next) => {
        const id = req.params.id;

        try {
            const result = await usersController.findById(id);

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

        try {
            await usersController.create(values);

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

            await usersController.updateById(id, values);

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
            await usersController.deleteById(id);

            res.json({
                status: 'success',
                code: 200
            });
        } catch (err) {
            next(err);
        }
    });

module.exports = router;