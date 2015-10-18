angular.module('app')
.directive('siteHeader', function () {
  return {
    restrict: 'E',
    templateUrl: '/templates/site-header.html'
  };
});
