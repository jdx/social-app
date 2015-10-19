angular.module('app')
.controller('FeedCtrl', function ($scope, $location, PostSvc, WebSocketSvc) {
  if (!$scope.currentUser) {
    $location.path('/login');
    return;
  }

  function refresh() {
    PostSvc.fetch()
    .then(function (posts) {
      $scope.posts = posts;
    });
  }
  refresh();

  WebSocketSvc.on('Post', function (post) {
    $scope.$apply();
    PostSvc.find(post.of)
    .then(function (post) {
      console.log(post);
      $scope.posts.push(post);
    });
  });

  $scope.createPost = function () {
    PostSvc.create($scope.newPost)
    .then(function () {
      $scope.newPost = {};
    });
  };
});
