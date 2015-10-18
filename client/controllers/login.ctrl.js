angular.module('app')
.controller('LoginCtrl', function ($scope, $location, UserSvc) {
  $scope.login = function (username, password) {
    console.log('logging in as', username);
    UserSvc.login(username, password)
    .then(function (user) {
      console.log('logged in as', user);
      $scope.$emit('login', user);
      $location.path('/');
    });
  };
});
