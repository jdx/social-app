angular.module('app')
.controller('UserCtrl', function ($scope, $routeParams, UserSvc) {
  UserSvc.fetchUser($routeParams.username)
  .then(function (user) {
    $scope.user = user;
  });

  if ($scope.currentUser) {
    UserSvc.isFollowing($routeParams.username)
    .then(function (following) {
      $scope.following = following;
    });
  }

  $scope.follow = function () {
    UserSvc.follow($scope.user.username)
    .then(function () {
      $scope.following = true;
    });
  };

  $scope.unfollow = function () {
    UserSvc.unfollow($scope.user.username)
    .then(function () {
      $scope.following = false;
    });
  };
});
