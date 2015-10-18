angular.module('app')
.controller('ApplicationCtrl', function ($scope, $location, UserSvc) {
  $scope.$on('login', function (_, user) {
    $scope.currentUser = user;
  });

  $scope.logout = function () {
    delete $scope.currentUser;
    UserSvc.logout();
    $location.path('/');
    console.log('logging out');
  };
});
