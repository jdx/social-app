'use strict';
let db = require('.');

let Following = db.model('Following', {
  from: {type: db.Schema.ObjectId, required: true, ref: 'User'},
  to:   {type: db.Schema.ObjectId, required: true, ref: 'User'},
});

module.exports = Following;
