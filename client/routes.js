angular.module('app')
.config(function ($routeProvider) {
  $routeProvider
  .when('/', {controller: 'FeedCtrl', templateUrl: '/templates/feed.html'});
});
