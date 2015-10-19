'use strict';

let db = require('mongoose');
db.connect('mongodb://localhost/social-app');
db.set('debug', true);
module.exports = db;
