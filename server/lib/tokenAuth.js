const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const {
    User,
} = require('../database');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: '7x0jhxt"9(thpX6',
};


const passport = require('passport');

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const profile = await User.findByPk(jwt_payload.id);

        if (profile) {
            return done(null, profile);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));

const getToken = (payload) => jwt.sign(payload, opts.secretOrKey);

const authCheck = passport.authenticate('jwt', { session: false });

module.exports = {
    jwtPassport: passport,
    getToken,
    authCheck,
};