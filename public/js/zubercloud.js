/******************************
zubercloud webapp
Created By: Graham Zuber
for: The Zuber Family
Created: 7.3.15
Last Updated: 7.3.15
*******************************/


(function() {

  angular.module('zubercloud', ['ngResource', 'ngRoute', 'ngSanitize',
    'com.2fdevs.videogular', 'com.2fdevs.videogular.plugins.controls',
    'com.2fdevs.videogular.plugins.overlayplay', 'com.2fdevs.videogular.plugins.poster'])

  .config(function($routeProvider, $locationProvider) {

    $locationProvider.hashPrefix('!');

    $routeProvider

      .when('/', { templateUrl: 'partials/views/main/main.html',
        controller: 'zcMainCtrl'})

      .when('/login', { templateUrl: 'partials/views/account/login.html',
        controller: 'zcLoginCtrl'})

      .when('/movies', { templateUrl: 'partials/views/movies/main.html',
        controller: 'zcMoviesMainCtrl'})

      .when('/movies/:id', { templateUrl: 'partials/views/movies/detail.html',
        controller: 'zcMoviesDetailCtrl'})

      .when('/movies/play/:id', { templateUrl: 'partials/views/movies/play.html',
        controller: 'zcMoviesPlayCtrl'})

      .when('/admin', { templateUrl: 'partials/views/admin/main.html',
        controller: 'zcAdminMainCtrl'})

      .when('/admin/user/add', { templateUrl: 'partials/views/admin/adduser.html',
        controller: 'zcAdminUserAddCtrl'})

      .when('/admin/user/reset', { templateUrl: 'partials/views/admin/resetuser.html',
        controller: 'zcAdminUserResetCtrl'})

      .when('/admin/movie/add', { templateUrl: 'partials/views/admin/addmovie.html',
        controller: 'zcAdminMovieAddCtrl'})

      .when('/admin/movie/remove', { templateUrl: 'partials/views/admin/removemovie.html',
        controller: 'zcAdminMovieRemoveCtrl'})

      .when('/admin/movie/edit', { templateUrl: 'partials/views/admin/editmovie.html',
        controller: 'zcAdminMovieEditCtrl'})

      .otherwise({
        redirectTo: '/'
      });



  })

  .run(function($rootScope, $location, zcUser) {

    zcUser.getSession().then(
      function(data) {
        zcUser.currentUser = data.user;
      },
      function(data) {
        if(data.status === 401) { zcUser.notAuthenticated(); }
      }
    );

  });


})();
