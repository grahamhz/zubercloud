angular.module('zubercloud').controller('zcMoviesPlayCtrl', ['$sce', '$routeParams', '$scope',
function($sce, $routeParams, $scope) {

    $scope.config = {
      sources: [
        {
          src: $sce.trustAsResourceUrl("/movies/play/" + $routeParams.id),
          type: "video/mp4"
        }
      ],
      theme: "vendor/videogular-themes-default/videogular.min.css",
      plugins: {
        poster: "http://www.videogular.com/assets/images/videogular.png"
      }
    };

}]);
