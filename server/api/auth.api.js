// import express from 'express';
const express = require('express');
const { getToken, authCheck } = require('../lib/tokenAuth');

const {
    User,
} = require('../database');

const { validPassword } = require('../lib/passwordBcrypt');
const {
    ForbiddenError,
} = require('../lib/errors');

const router = express.Router();


router
    .post('/login', async (req, res) => {
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

            var payload = { id: user.id };

            var token = getToken(payload);

            res.json({
                status: 'success',
                token: token,
            });
        } else {
            res.status(401).json({ message: 'Passwords did not match' });
        }
    })

    .post('/logout', authCheck, async (req, res) => {
        req.session.destroy();
        res.json({
            status: 'success',
            message: 'Logged out!',
        });
    })

    .post('/authorized', async (req, res, next) => {
        if (req.session.authorized && req.session.user) {
            return res.json({
                authorized: req.session.authorized,
                isAdmin: req.session.user.isAdmin,
            });
        }

        next(new ForbiddenError());
    })

    .post('/registration', async (req, res, next) => {
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
    });

module.exports = router;