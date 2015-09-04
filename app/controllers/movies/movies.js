var model = require('../../models/movies/movies');
var path = require('path');
var fs = require('fs');

exports.getMovieByID = function(req, res) {

  model.getByID(req.params.id, function(movie) {
    res.send({
      movie: movie,
      msg: "Successfully got movie."
    });
  });

};

exports.getMovies = function(req, res) {

  model.getAll(function(err, movies) {

    if(err !== null ) {
      res.status(500).send({ msg: err });
    }
    else {
      res.send({
        movies: movies,
        msg: "Successfully got movies."
      });
    }

  });
};

exports.playMovieByID = function(req, res) {

  console.log(req.params);

  var rootpath = path.normalize(__dirname + '/../../');
  var moviePath = rootpath + 'videos/Contagion.mp4';
  var contentType = "video/mp4";

  fs.stat(moviePath, function(err, stats) {
    var headers;
    if(err) {
      res.status(404).send({ msg: err });
      return;
    }

    var range = req.headers.range || "";
    var total = stats.size;

    if(range) {

      var parts = range.replace(/bytes=/, "").split("-");
      var partialstart = parts[0];
      var partialend = parts[1];

      var start = parseInt(partialstart, 10);
      var end = partialend ? parseInt(partialend, 10) : total-1;

      var chunksize = (end-start)+1;

      headers= {
        "Content-Range": "bytes " + start + "-" + end + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": contentType
      };
      res.writeHead(206, headers);
    } else {

      headers = {
        "Accept-Ranges": "bytes",
        "Content-Length": stats.size,
        "Content-Type": contentType
      };
      res.writeHead(200, headers);
    }

    var readStream = fs.createReadStream(moviePath, { start: start, end: end });
    readStream.pipe(res);
  });

};
