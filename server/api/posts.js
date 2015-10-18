'use strict';

let r    = require('express').Router();
let Post = require('../db/post');

r.use(require('../middleware/auth'));

r.get('/api/posts', function (req, res, next) {
  Post.find()
  .populate('user')
  .sort('-_id')
  .exec(function (err, posts) {
    if (err) return next(err);
    res.json(posts);
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
