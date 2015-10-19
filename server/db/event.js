'use strict';
let db = require('.');

let Event = new db.Schema({
  type: {type: String, required: true},
  of:   {type: db.Schema.ObjectId, required: true},
  by:   {type: db.Schema.ObjectId, required: true, ref: 'User'},
  at:   {type: Date, default: Date.now},
}, {capped: {size: 524288, max: 1000}});

module.exports = db.model('Event', Event);
