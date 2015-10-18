'use strict';

let config = require('../config');
let jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  let token = req.headers['auth-token'];
  if (!token) return next();
  jwt.verify(token, config.secret, function (err, user) {
    if (err) return next(err);
    req.user = user;
    delete req.user.password;
    next();
  });
};
