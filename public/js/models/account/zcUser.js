angular.module('zubercloud').factory('zcUser', function($http, $q, $location) {

  var user = {};

  user.currentUser = undefined;

  user.isAuthenticated = function() {
    return !!this.currentUser;
  };

  user.notAuthenticated = function() {

    user.currentUser = undefined;
    $location.path('/login');
  };

  user.getSession = function() {

    var deferred = $q.defer();

    $http.get('/session')

    .success(function(data, status) {
      deferred.resolve(data);
    })

    .error(function(data, status) {
      deferred.reject({
        data: data,
        status: status
      });
    });

    return deferred.promise;
  };

  return user;

});
