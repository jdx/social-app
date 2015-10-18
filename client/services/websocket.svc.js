angular.module('app')
.factory('WebSocketSvc', function() {
  let socket = io.connect();
  socket.connect = function (token) {
    socket.emit('auth', token);
  };
  return socket;
});
