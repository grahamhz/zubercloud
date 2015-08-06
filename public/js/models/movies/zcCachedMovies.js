angular.module('zubercloud').factory('zcCachedMovies', function(zcMovies) {

  var movieList;

  return {
    query: function() {

      if(!movieList) {
        movieList = zcMovies.query();
      }
      else {

        $http.get('/quickauth')

        .success(function(data, status) {
          deferred.resolve(data);
        })

        .error(function(data, status) {
          deferred.reject({
            data: data,
            status: status
          });
        });
      }

      return movieList;

    }
  };

});
