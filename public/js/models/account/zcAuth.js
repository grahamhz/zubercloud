angular.module('zubercloud').factory('zcAuth', function($http, $q, zcUser) {

  return {

    authenticateUser: function(username, password) {

      var deferred = $q.defer();

      $http.post('/login', {
        username: username,
        password: password
      })

      .success(function(data) {
        deferred.resolve(data);
      })

      .error(function(data, status) {
        if(status === 400) deferred.reject(data);
        else deferred.reject({ msg: "Unknown Error" });
      });

      return deferred.promise;
    },

    logoutUser: function() {

      var deferred = $q.defer();

      // include object or angular changes it to a get
      $http.post('/logout', { logout: true })

      .success(function(data) {
        zcUser.currentUser = undefined;
        deferred.resolve(data);
      })

      .error(function(data) {
        deferred.reject(data);
      });

      return deferred.promise;
    }
  };

});
