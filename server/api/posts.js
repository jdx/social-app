'use strict';

let r    = require('express').Router();
let Post = require('../db/post');

r.use(require('../middleware/auth'));

r.get('/api/posts', function (req, res, next) {
  Post.find(function (err, posts) {
    if (err) return next(err);
    res.json(posts);
  });
});

module.exports = r;
