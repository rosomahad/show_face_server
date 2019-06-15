// import express from 'express';
const express = require('express');
const { getToken } = require('../lib/tokenAuth');

const {
    User,
} = require('../database');

const { validPassword } = require('../lib/passwordBcrypt');

const {
    ForbiddenError,
} = require('../lib/errors');

const router = express.Router();


router
    .post('/sign_in', async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({ message: 'Wrong data' });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'No such user found' });
        }

        const isValid = await validPassword(password, user.passwordHash);

        if (isValid) {
            const token = getToken({ userId: user.id });

            req.session.authorized = true;

            req.session.user = user;

            req.session.token = token;

            res.json({
                status: 'success',
                data: {
                    user,
                    token,
                    isAuth: true
                },
            });
        } else {
            res.status(401).json({ message: 'Passwords did not match' });
        }
    })

    .post('/sign_up', async (req, res, next) => {
        const values = req.body;

        try {
            const result = await User.addNewUser(values);

            res.json({
                status: 'success',
                data: result,
                code: 200
            });
        } catch (err) {
            next(err);
        }
    })

    .post('/logout', async (req, res) => {
        req.session.destroy();

        res.json({
            status: 'success',
            message: 'Logged out!',
        });
    })

    .get('/is_authorized', async (req, res, next) => {
        if (req.session.authorized && req.session.user) {
            return res.json({
                status: 'success',
                data: {
                    token: req.session.token,
                    user: req.session.user,
                    isAuth: true
                },
            });
        }

        next(new ForbiddenError());
    });

module.exports = router;