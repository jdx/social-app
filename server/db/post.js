'use strict';
let db = require('.');

let schema = new db.Schema({
  body: {type: String, required: true},
  user: {type: db.Schema.ObjectId, required: true, ref: 'User'},
});

module.exports = db.model('Post', schema);
