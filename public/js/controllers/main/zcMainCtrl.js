angular.module('zubercloud').controller('zcMainCtrl', function($scope, $http) {

  $scope.options = [
    {
      name: "new"
    },
    {
      name: "popular"
    },
    {
      name: "genres"
    },
    {
      name: "actors"
    },
    {
      name: "years"
    }
  ];

});
