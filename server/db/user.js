'use strict';
let db = require('.');

let User = db.model('User', {
  fullName: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true, select: false},
});

module.exports = User;
