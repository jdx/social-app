'use strict';
let db = require('.');

let Post = db.model('Post', {
  body: {type: String, required: true},
  user: {type: db.Schema.ObjectId, required: true, ref: 'User'},
});

module.exports = Post;
