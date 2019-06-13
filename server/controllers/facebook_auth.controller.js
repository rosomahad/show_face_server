const passport = require('passport');
const { facebook } = require('../config/config');
const FacebookStrategy = require('passport-facebook').Strategy;
const { Customer } = require('../database');

const FB_AUTH_OPTIONS = {
    clientSecret: facebook.api_secret,
    clientID: facebook.api_key,
    callbackURL: facebook.callback_url,
    profileFields: ['id', 'displayName', 'email']
};

passport.use(new FacebookStrategy(FB_AUTH_OPTIONS, async (accessToken, refreshToken, profile, done) => {
    process.nextTick(async () => {
        const { id, name, email } = profile['_json'];

        if (facebook.use_database) {
            try {
                const profile = await Customer.findOne({
                    attributes: ['fullname', 'email', 'phone', 'id'],
                    where: { email },
                    raw: true,
                });

                done(null, profile);
            } catch (err) {
                done(err);
            }
        } else {
            done(null, { id, name, email });
        }
    });
}));


passport.serializeUser(function (user, done) {
    done(null, user.userid);
});

passport.deserializeUser(function (id, done) {
    Customer.findByPk(id).then(user => {
        done(null, user);
    }).catch(err => done(err));
});

module.exports = passport;
