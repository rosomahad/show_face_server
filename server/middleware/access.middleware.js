
const { authCheck } = require('../lib/tokenAuth');

// TODO: MOVE TO MIDDLEWARE FOLDER
// module.exports = authCheck;

// TODO: Remove
module.exports = (req, res, next) => {
    next();
};