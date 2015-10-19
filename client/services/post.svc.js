angular.module('app')
.service('PostSvc', function ($http) {
  this.fetch = function () {
    return $http.get('/api/posts')
    .then(function (rsp) { return rsp.data; });
  };

  this.create = function (post) {
    return $http.post('/api/posts', post);
  };

  this.find = function (id) {
    return $http.get('/api/posts/'+id)
    .then(function (rsp) { return rsp.data });
  };
});
