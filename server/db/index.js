'use strict';

let db = require('mongoose');
db.connect('mongodb://localhost/social-app');
module.exports = db;
