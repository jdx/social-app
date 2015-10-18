'use strict';

let r         = require('express').Router();
let User      = require('../db/user');
let Following = require('../db/following');
let bcrypt    = require('bcrypt');
let jwt       = require('jsonwebtoken');
let config    = require('../config');
let gravatar  = require('gravatar');

r.get('/api/user', function (req, res, next) {
  if (!req.user) return res.sendStatus(401);
  User.findById(req.user._id)
  .exec(function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

r.get('/api/users/:username', function (req, res, next) {
  User.findOne({username: req.params.username})
  .exec(function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

r.get('/api/users/:username/follow', function (req, res, next) {
  User.findOne({username: req.params.username})
  .exec(function (err, user) {
    if (err) return next(err);
    Following.findOne({from: req.user._id, to: user._id})
    .exec(function (err, followed) {
      if (err) return next(err);
      res.json(!!followed);
    });
  });
});

r.post('/api/users/:username/follow', function (req, res, next) {
  User.findOne({username: req.params.username})
  .exec(function (err, user) {
    if (err) return next(err);
    let following = new Following({from: req.user._id, to: user._id});
    following.save(function (err) {
      if (err) return next(err);
      res.sendStatus(201);
    });
  });
});

r.post('/api/users/:username/unfollow', function (req, res, next) {
  User.findOne({username: req.params.username})
  .exec(function (err, user) {
    if (err) return next(err);
    Following.find({from: req.user._id, to: user._id})
    .remove()
    .exec(function (err) {
      res.sendStatus(200);
    });
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
