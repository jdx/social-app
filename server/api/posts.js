'use strict';

let r         = require('express').Router();
let Post      = require('../db/post');
let Following = require('../db/following');
let Event     = require('../db/event');

r.get('/api/posts', function (req, res, next) {
  Following.fromUser(req.user._id, function (err, followings) {
    if (err) return next(err);
    Post.where('user').in(followings)
    .populate('user')
    .sort('-_id')
    .exec(function (err, posts) {
      if (err) return next(err);
      res.json(posts);
    });
  });
});

r.get('/api/posts/:id', function (req, res, next) {
  Post.findById(req.params.id)
  .populate('user')
  .exec(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

r.post('/api/posts', function (req, res, next) {
  let post = new Post(req.body);
  post.user = req.user._id;
  post.save(function (err, post) {
    if (err) return next(err);
    res.sendStatus(201);
    let event = new Event({type: 'Post', of: post._id, by: post.user});
    event.save(err => err && console.error(err.stack));
  });
});

module.exports = r;
