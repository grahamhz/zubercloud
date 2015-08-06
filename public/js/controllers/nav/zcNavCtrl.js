angular.module('zubercloud').controller('zcNavCtrl',
  function($rootScope, $scope, $location, zcUser, zcAuth, zcNotifier) {

    $rootScope.$on('$routeChangeSuccess', function(event, next, current) {
      var curPath = $location.path();
      var curPathSplit = curPath.split('/');
      $scope.activeLink = curPathSplit[1];
    });


    $scope.user = zcUser;

    $scope.logout = function() {

      zcAuth.logoutUser().then(
        function(data) {
          $location.path('/');
          zcNotifier.success(data.msg, "Log Out");
        },
        function(data) {
          zcNotifier.error(data.msg, "Log Out Error");
        }
      );

    };
  }
);
