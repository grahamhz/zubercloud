angular.module('zubercloud').controller('zcAdminMovieAddCtrl', ['$scope', '$q', '$window', 'zcSocket',
function($scope, $q, $window, zcSocket) {

  $scope.imageUrl = "";
  $scope.filesToUpload = [];
  var files = [];
  var currentWorkers = [];

  $scope.files_added = function(newFiles, event, flow) {
    for(var i = 0, length = newFiles.length; i < length; i++) {

      if(newFiles[i].file.type.indexOf("image") > -1) {
        //$scope.imageUrl = files[i].file.relativePath;
        $scope.filesToUpload.push({
          name: newFiles[i].file.name,
          percentage: 0
        });
        $scope.$apply();
        files.push(newFiles[i].file);
      }
      else if(newFiles[i].file.type.indexOf("video/mp4") > -1){
        $scope.filesToUpload.push({
          name: newFiles[i].file.name,
          percentage: 0
        });
        $scope.$apply();
        files.push(newFiles[i].file);
      }
      else {
        $window.alert("File type is not supported");
      }
    }
  };

  $scope.upload_files = function(){

    for(var i = 0, length = files.length; i < length; i++) {

      //callNewWorker($scope.filesToUpload[i]).then(function(reply) {
        //console.log(reply);
      //});


      var name = files[i].name;

      var reader = new FileReader();
      reader.onload = function(event) {
        console.log(event);
        console.log("file - ");
        console.log(name);
        zcSocket.emit('uploadMovieImg', {
          'name': name,
          'data': event.target.result
        });
      };
      files[i].reader = reader;

      zcSocket.emit('startUploadMovieImg', {
        'name': files[i].name,
        'size': files[i].size
      });


    }
  };



  function callNewWorker(file) {
    var worker = new Worker('js/workers/upload.js');
    var defer = $q.defer();
    worker.onmessage = function(event) {
      defer.resolve(event.data);
      worker.terminate();
    };
    worker.postMessage(file);
    return defer.promise;
  }















  zcSocket.on('uploadMovieImgMore', function(data) {
    console.log(data);
    for(var i = 0, length = files.length; i < length; i++) {
      if(data['name'] === files[i].name) {

        $scope.filesToUpload[i].percentage = {
          'width': data['percent'] + '%'
        };

        var place = data['place'] * 524288;
        var blob = files[i].slice(place, place + Math.min(place + 524288, (files[i].size - place)));

        console.log(files[i]);

/*
        if($scope.filesToUpload[i].webkitSlice) {
          blob = $scope.filesToUpload[i].webkitSlice(place, place + Math.min(524288, ($scope.filesToUpload[i].size - place)));
        }
        else {
          blob = $scope.filesToUpload[i].mozSlice(place, place + Math.min(524288, ($scope.filesToUpload[i].size - place)));
        }
*/

        files[i].reader.readAsBinaryString(blob);

      }
    }
  });

  zcSocket.on('uploadMovieImgDone', function(data) {
    for(var i = 0, length = files.length; i < length; i++) {
      if(data['name'] === files[i].name) {

        $scope.filesToUpload[i].percentage = {
          'width': '100%'
        };
      }
    }

  });


}]);
