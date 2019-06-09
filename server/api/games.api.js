const express = require('express');

const accessMiddleware = require('../middleware/access.middleware');

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
        const id = req.params.id;

        try {
            // TODO: 
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