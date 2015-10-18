'use strict';

let jwt    = require('jsonwebtoken');
let config = require('./config');

module.exports = function (server) {
  let io = require('socket.io')(server);

  io.on('connection', function (socket) {
    console.log('ws connected');
    socket.on('auth', function (token) {
      jwt.verify(token, config.secret, function (err, user) {
        if (err) return console.error(err);
        console.log(`ws authenticated as ${user.username}`);
        socket.emit('post', {foo: 'bar'});
      });
    });
  });
};
