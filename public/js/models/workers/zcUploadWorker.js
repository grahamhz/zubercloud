angular.module('zubercloud').factory('zcUploadWorker', ['$q',
function ($q) {

  var worker = new Worker('../../workers/upload.js');
  var defer = $q.defer();

  worker.addEventListener('message', function(e) {
    
  });

}]);
