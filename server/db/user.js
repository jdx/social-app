'use strict';
let db = require('.');

let schema = new db.Schema({
  fullName:  {type: String, required: true},
  email:     {type: String, required: true, unique: true},
  avatarUrl: {type: String, required: true},
  username:  {type: String, required: true, unique: true},
  password:  {type: String, required: true, select: false},
});

module.exports = db.model('User', schema);
