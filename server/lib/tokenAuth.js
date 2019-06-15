const jwt = require('jsonwebtoken');

const SECRET_KEY = 'SECRET_KEY_2019';

const verifyToken = (token, callback) => {
    jwt.verify(token, SECRET_KEY, callback);

};

const getToken = ({ userId }) => {
    return jwt.sign({ userId }, SECRET_KEY);
};

module.exports = {
    verifyToken,
    getToken
};