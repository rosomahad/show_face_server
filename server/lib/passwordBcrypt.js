const bcrypt = require('bcrypt');


const SALT_ROUNDS = 10;

module.exports = {

    validPassword: async (password, passwordHash) => bcrypt.compare(password, passwordHash),

    encryptPassword: async (password) => {
        return new Promise((resolve, reject) => {

            bcrypt.genSalt(SALT_ROUNDS, function (err, salt) {
                if (err) return reject(err);

                bcrypt.hash(password, salt, function (err, hash) {
                    if (err) return reject(err);
                    resolve(hash);
                });
            });
        });
    },
};