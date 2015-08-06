angular.module('zubercloud').controller('zcMoviesMainCtrl', function(
  $scope, $location, zcUser, zcMovies) {

  zcMovies.query().then(
    function(data) {
      $scope.movies = data.movies;
    },
    function(data) {

      if(data.status === 401) { zcUser.notAuthenticated(); }
    }
  );

});
