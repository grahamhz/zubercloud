angular.module('zubercloud').controller('zcMoviesPlayCtrl', function(
  $scope, $routeParams, $sce, zcMovies, zcUser, zcNotifier) {
/*
    this.config = {
      sources: [
        {
          src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"),
          type: "video/mp4"
        },
        {
          src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"),
          type: "video/webm"
        },
        {
          src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"),
          type: "video/ogg"
        }
      ],
      tracks: [
        {
          src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
          kind: "subtitles",
          srclang: "en",
          label: "English",
          default: ""
        }
      ],
      theme: "vendor/videogular-themes-default/videogular.min.css",
      plugins: {
        poster: "http://www.videogular.com/assets/images/videogular.png"
      }
    };
*/
/*
    zcMovies.get($routeParams.id).then(
      function(data) {
        $scope.movie = data.movie;
      },
      function(data) {
        zcNotifier.error("Could not get Movie Information");
      }
    );
*/

  $scope.movieid = $routeParams.id;

});
