angular.module('app')
.controller('RegisterCtrl', function ($scope, UserSvc) {
  $scope.register = function (user) {
    UserSvc.register(user);
  };
});
