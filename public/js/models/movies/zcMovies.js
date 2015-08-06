angular.module('zubercloud').factory('zcMovies', function($http, $q) {

  return {

    query: function() {

      var deferred = $q.defer();

      $http.get('/movies')

      .success(function(data) {
        deferred.resolve(data);
      })

      .error(function(data, status) {
        deferred.reject({
          data: data,
          status: status
        });
      });

      return deferred.promise;
    },

    get: function(id) {

      var deferred = $q.defer();

      $http.get('/movies/' + id)

      .success(function(data) {
        deferred.resolve(data);
      })

      .error(function(data, status) {
        deferred.reject({
          data: data,
          status: status
        });
      });

      return deferred.promise;
    }

  };

});
