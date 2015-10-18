'use strict';

let r        = require('express').Router();
let User     = require('../db/user');
let bcrypt   = require('bcrypt');
let jwt      = require('jsonwebtoken');
let config   = require('../config');
let gravatar = require('gravatar');

r.use(require('../middleware/auth'));

r.get('/api/user', function (req, res, next) {
  if (!req.user) return res.sendStatus(401);
  console.log(req.user);
  User.findById(req.user._id, function (err, user) {
    if (err) return next(err);
    console.log(user);
    res.json(user);
  });
});

r.post('/api/users', function (req, res, next) {
  let user = new User(req.body);
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    user.avatarUrl = gravatar.url(user.email, {s: 220, d: 'retro'});
    user.save(function (err) {
      if (err) return next(err);
      res.sendStatus(201);
    });
  });
});

function getUserWithPassword(username, password, callback) {
  User.findOne({username})
  .select('_id')
  .select('username')
  .select('password')
  .exec(function (err, user) {
    if (err)   return callback(err);
    if (!user) return callback();
    console.log(user);
    bcrypt.compare(password, user.password, function (err, valid) {
      if (err)    return callback(err);
      if (!valid) return callback();
      callback(null, user);
    });
  });
}

r.post('/api/login', function (req, res, next) {
  getUserWithPassword(req.body.username, req.body.password, function (err, user) {
    if (err)   return next(err);
    if (!user) return res.sendStatus(401);
    let payload = {_id: user._id, username: user.username};
    let token = jwt.sign(payload, config.secret);
    res.send(token);
  });
});

module.exports = r;
