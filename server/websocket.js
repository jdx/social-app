'use strict';

let jwt       = require('jsonwebtoken');
let config    = require('./config');
let Event     = require('./db/event');
let Following = require('./db/following');

function streamEvents(socket, user) {
  Following.fromUser(user._id, function (err, followings) {
    if (err) return console.error(err.stack);
    let eventStream = Event
    .where('by').in(followings)
    .where('at').gt(Date.now())
    .tailable(true, {awaitdata: true, numberOfRetries: Number.MAX_VALUE})
    .stream();
    eventStream.on('data', function (event) {
      console.log(event);
      socket.emit(event.type, event);
    });
    eventStream.on('error', function (err) {
      console.error(err.stack);
    });
    socket.on('disconnect', function () {
      console.log('dc');
      eventStream.destroy();
    });
  });
}

module.exports = function (server) {
  let io = require('socket.io')(server);

  io.on('connection', function (socket) {
    console.log('ws connected');
    socket.on('auth', function (token) {
      jwt.verify(token, config.secret, function (err, user) {
        if (err) return console.error(err);
        console.log(`ws authenticated as ${user.username}`);
        streamEvents(socket, user);
      });
    });
  });
};
