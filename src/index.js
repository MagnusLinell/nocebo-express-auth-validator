const expressJwt = require('express-jwt');

const validateOptions = (options) => {
    if (!options || !options.jwtSecret) {
        throw Error("argument {jwtSecret: [SECRET]} must be set");
    }
};

const validateAuthorization = (options) => {
  return (req, res, next) => {
    req.auth = req.auth || {};
    req.auth.bearer = req.headers.authorization && req.headers.authorization.split(' ').length > 1 ? req.headers.authorization.split(' ')[1] : '';
    return expressJwt({
      'secret': new Buffer(options.jwtSecret, 'base64')
    })(req, res, next);
  };
};

const validateUser = (req, res, next) => {
  if (!req.user) {
    return next({
      code: 'unauthorized'
    });
  }
  next();
}

module.exports = (options) => {
    validateOptions(options);
    return [validateAuthorization(options), validateUser];
};
