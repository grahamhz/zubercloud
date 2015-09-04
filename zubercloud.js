var express = require('express');
var sharedSession = require('express-socket.io-session');
var app = express();

var files = [];

// config the server
var config = require('./app/config/config');

// set up middleware
var session = require('./app/config/express')(app, config);

// set up the mongodb connection
var db = require('./app/config/mongoose')(config);

// set up passport authentication and middleware
require('./app/config/passport')();

// set up routes
require('./app/config/routes')(app);

// set up the server to listen
var server = app.listen(config.port, function() {
  console.log("Listening on port " + config.port + ".");
});

// set up socket.io to listen to connections
var io = require('socket.io').listen(server);
//io.use(sharedSession(session));

var path = require('path');
var fs = require('fs');

var imagePath = path.normalize(__dirname + '/public/img/movies/');
var videoPath = path.normalize(__dirname + '/app/videos/');
var tempImgPath = path.normalize(__dirname + '/app/temp/img/movies/');

io.on('connection', function(socket) {

  //console.log("Listening for new sockets.");

  socket.on('test', function(data) {
    console.log(data);
  });

  socket.on('startUploadMovieImg', function(data) {

    var name = data['name'];

    files[name] = {
      fileSize: data['size'],
      data: "",
      downloaded: 0
    };

    var place = 0;

    try{
      var stat = fs.statSync(tempImgPath);
      if(stat.isFile()) {
        files[name]['downloaded'] = stat.size;
        place = (stat.size / 524288);
      }
    }
    catch(err){}

    fs.open(tempImgPath + name, "a", 0755, function(err, fd) {
      if(err) {
        console.log(err);
      }
      else {
        files[name]['handler'] = fd;
        socket.emit('uploadMovieImgMore', {
          'name': name,
          'place': place,
          'percent': 0
        });
      }
    })
  });

  socket.on('uploadMovieImg', function(data) {
    var name = data['name'];
    files[name]['downloaded'] += data['data'].length;
    files[name]['data'] += data['data'];

    if(files[name]['downloaded'] === files[name]['fileSize']) {
      fs.write(files[name]['handler'], files[name]['data'], null, 'Binary', function(err, written) {
        socket.emit('uploadMovieImgDone', {
          'name': name
        });
      });
    }
    else if(files[name]['data'].length > 10485760) {
      fs.write(files[name]['handler'], files[name]['data'], null, 'Binary', function(err, written) {
        files[name]['data'] = "";
        var place = (files[name]['downloaded'] / 524288);
        var percent = ((files[name]['downloaded'] / files[name]['fileSize']) * 100);
        socket.emit('uploadMovieImgMore', {
          'name': name,
          'place': place,
          'percent': percent
        });
      });
    }
    else {
      var place = (files[name]['downloaded'] / 524288);
      var percent = ((files[name]['downloaded'] / files[name]['fileSize']) * 100);
      socket.emit('uploadMovieImgMore', {
        'name': name,
        'place': place,
        'percent': percent
      });
    }
  });
});
