angular.module('app')
.directive('myProfile', function () {
  return {
    restrict: 'E',
    templateUrl: '/templates/my-profile.html'
  };
});
