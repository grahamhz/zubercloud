angular.module('zubercloud').controller('zcLoginCtrl',
  function($scope, $http, $location, zcAuth, zcUser, zcNotifier) {

    $scope.login = function(username, password) {

      zcAuth.authenticateUser(username, password).then(

        function(data) {
          zcUser.currentUser = data.user;
          $location.path('/');
          zcNotifier.success(data.msg, "Log In");
        },

        function(data) {
          zcNotifier.error(data.msg, "Log In Error");
        }
      );

    };

});
