const expressJwt = require('express-jwt');

const validateOptions = (options) => {
    if (!options || !options.jwtSecret) {
        throw Error("argument {jwtSecret: [SECRET]} must be set");
    }
};

const validateAuthorization = (options) => {
    return expressJwt({
        'secret': new Buffer(options.jwtSecret, 'base64')
    });
};

module.exports = (options) => {
    validateOptions(options);
    return validateAuthorization(options);
};
