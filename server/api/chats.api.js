const express = require('express');

const accessMiddleware = require('../middleware/access.middleware');

const {
    NotFoundError
} = require('../lib/errors.js');

const { messagesController, chatsController } = require('../controllers');

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

    .get('/:chatId/messages', accessMiddleware, async (req, res, next) => {
        const chatId = req.params.chatId;

        try {
            const { rows, count } = await messagesController.findByChatId(chatId);

            res.json({
                status: 'success',
                data: {
                    rows,
                    count,
                }
            });

        } catch (err) {
            next(err);
        }
    })

    .post('/:chatId/messages', accessMiddleware, async (req, res, next) => {
        const chatId = req.params.chatId;
        const userId = req.session.user.id;
        const values = req.body;

        try {
            const message = await messagesController.createByChatId({
                chatId,
                userId,
                values
            });

            res.json({
                status: 'success',
                data: message
            });

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