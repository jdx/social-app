angular.module('app')
.controller('FeedCtrl', function ($scope, $location, PostSvc, WebSocketSvc) {
  if (!$scope.currentUser) {
    $location.path('/login');
  }

  function refresh() {
    PostSvc.fetch()
    .then(function (posts) {
      $scope.posts = posts;
    });
  }
  refresh();

  WebSocketSvc.on('post', function (post) {
    console.log(post);
  });

  $scope.createPost = function () {
    PostSvc.create($scope.newPost)
    .then(function () {
      refresh();
      $scope.newPost = {};
    });
  };
});
