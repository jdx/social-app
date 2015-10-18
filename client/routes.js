angular.module('app')
.config(function ($routeProvider) {
  $routeProvider
  .when('/',                {controller: 'FeedCtrl', templateUrl: '/templates/feed.html'})
  .when('/login',           {controller: 'LoginCtrl', templateUrl: '/templates/login.html'})
  .when('/register',        {controller: 'RegisterCtrl', templateUrl: '/templates/register.html'})
  .when('/users/:username', {controller: 'UserCtrl', templateUrl: '/templates/user.html'});
});
