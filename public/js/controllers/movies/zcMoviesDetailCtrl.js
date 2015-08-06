angular.module('zubercloud').controller('zcMoviesDetailCtrl', function(
  $scope, $routeParams, $location, zcMovies, zcNotifier) {

    zcMovies.get($routeParams.id).then(
      function(data) {
        $scope.movie = data.movie;
      },
      function(data) {
        if(data.status === 401) { $location.path('/login'); }
        zcNotifier.error("Could not get Movie Information");
      }
    );

});
