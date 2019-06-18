const express = require('express');

const {
    User
} = require('../database');

const {
    usersController,
    chatsController
} = require('../controllers');

const accessMiddleware = require('../middleware/access.middleware');

const {
    getListQuery
} = require('../lib/querySelectors');

const {
    NotFoundError,
    ForbiddenError
} = require('../lib/errors.js');

const router = express.Router();

router

    .post('/:id/videos', accessMiddleware, async (req, res, next) => {
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

    .get('/:userId/chats', accessMiddleware, async (req, res, next) => {
        try {

            const { userId } = req.params;

            const sessionUserId = req.session.user.id;

            if (+sessionUserId !== +userId) throw new ForbiddenError();

            const result = await chatsController.findByUserId(userId);

            return res.json({
                data: {
                    rows: result.rows,
                    total: result.count,
                },
            });

        } catch (err) {
            next(err);
        }
    })

    .get('/:first_member_id/users/:second_member_id/chats', accessMiddleware, async (req, res, next) => {

        try {
            const { first_member_id: firstMemberId, second_member_id: secondMemberId } = req.params;

            const sessionUserId = req.session.id;

            if (sessionUserId !== firstMemberId && secondMemberId !== secondMemberId) {
                throw ForbiddenError();
            }

            const result = await chatsController.findByMembersOrCreate(firstMemberId, secondMemberId);

            return res.json({
                data: result,
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

    .post('/:userId/friends/:friendId', accessMiddleware, async (req, res, next) => {
        try {
            const userId = req.params.userId;

            const friendId = req.params.friendId;

            const sessionUserId = req.session.user.id;

            if (Number(userId) !== Number(sessionUserId)) { throw new ForbiddenError(); }

            await usersController.addFriend(userId, friendId);

            res.json({
                status: 'success',
                code: 200
            });

        } catch (err) {
            next(err);
        }
    })

    .delete('/:userId/friends/:friendId', accessMiddleware, async (req, res, next) => {
        try {
            const userId = req.params.userId;

            const friendId = req.params.friendId;

            const sessionUserId = req.session.user.id;

            if (Number(userId) !== Number(sessionUserId)) { throw new ForbiddenError(); }

            await usersController.removeFriend(userId, friendId);

            res.json({
                status: 'success',
                code: 200
            });

        } catch (err) {
            next(err);
        }
    })

    .get('/:userId/friends', accessMiddleware, async (req, res, next) => {
        try {
            const userId = req.params.userId;

            const friendId = req.params.friendId;

            await usersController.removeFriend(userId, friendId);

            res.json({
                status: 'success',
                code: 200
            });

        } catch (err) {
            next(err);
        }
    })

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