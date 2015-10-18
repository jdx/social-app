'use strict';

let config = require('../config');
let jwt = require('jsonwebtoken');

function auth (req, res, next) {
  let token = req.headers['auth-token'];
  if (!token) return next();
  jwt.verify(token, config.secret, function (err, user) {
    if (err) return next(err);
    req.user = user;
    delete req.user.password;
    next();
  });
};

module.exports = auth;
module.exports.required = function (req, res, next) {
  if (!req.user) return res.sendStatus(401);
  next();
};
