angular.module('app')
.service('UserSvc', function ($http) {
  var svc = this;

  svc.getUser = function () {
    return $http.get('/api/user')
    .then(function (rsp) { return rsp.data; });
  };

  svc.login = function (username, password) {
    return $http.post('/api/login', { username: username, password: password })
    .then(function (rsp) {
      svc.token = rsp.data;
      $http.defaults.headers.common['Auth-Token'] = svc.token;
      return svc.getUser();
    });
  };

  svc.register = function (user) {
    return $http.post('/api/users', user)
    .then(function () { return svc.login(user.username, user.password); });
  };

  svc.logout = function () {
    delete $http.defaults.headers.common['Auth-Token'];
  };
});
