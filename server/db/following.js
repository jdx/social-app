'use strict';
let db = require('.');

let schema = db.Schema({
  from: {type: db.Schema.ObjectId, required: true, ref: 'User'},
  to:   {type: db.Schema.ObjectId, required: true, ref: 'User'},
});

schema.statics.fromUser = function (user_id, callback) {
  return this.find({from: user_id})
  .select('to')
  .exec(function (err, followings) {
    if (err) return callback(err);
    followings = followings.map(f => f.to);
    followings.push(user_id);
    callback(null, followings);
  });
};

module.exports = db.model('Following', schema);
