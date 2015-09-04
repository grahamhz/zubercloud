angular.module('zubercloud').factory('zcSocket', ['$rootScope',
function ($rootScope) {

  var socket = io.connect();
  console.log("socket created");

  var socketFactory = {};

  socketFactory.on = function(eventName, callback) {

    var wrapper = function() {
      var args = arguments;
      $rootScope.$apply(function () {
        callback.apply(socket, args);
      });
    }

    socket.on(eventName, wrapper);

    return function () {
      socket.removeListener(eventName, wrapper);
    };
  };

  socketFactory.emit = function(eventName, data, callback) {

    socket.emit(eventName, data, function () {
      var args = arguments;
      $rootScope.$apply(function () {
        if(callback) {
          callback.apply(socket, args);
        }
      });
    });
  };

  return socketFactory;


}]);
