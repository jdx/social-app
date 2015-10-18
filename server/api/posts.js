'use strict';

let r         = require('express').Router();
let Post      = require('../db/post');
let Following = require('../db/following');

r.get('/api/posts', function (req, res, next) {
  Following.find({from: req.user._id})
  .exec(function (err, followings) {
    if (err) return next(err);
    followings = followings.map(f => f.to);
    followings.push(req.user._id); // see own posts

    Post.find()
    .where('user').in(followings)
    .populate('user')
    .sort('-_id')
    .exec(function (err, posts) {
      if (err) return next(err);
      res.json(posts);
    });
  });
});

r.post('/api/posts', function (req, res, next) {
  let post = new Post(req.body);
  post.user = req.user._id;
  post.save(function (err) {
    if (err) return next(err);
    res.sendStatus(201);
  });
});

module.exports = r;
