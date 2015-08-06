var Movie = require('mongoose').model('Movie');

exports.getAll = function(callback) {

  Movie.find({}).exec(function(err, collection) {

    if(err) {
      callback(err.toString(), null);
    }

    callback(null, collection);
  });
};


exports.getByTag = function(tag, callback) {

  Movie.find({ tags: tag }).exec(function(err, collection) {

    if(err) {
      callback(err.toString(), null);
    }

    callback(null, collection);
  });
};


exports.getByID = function(id, callback) {

  Movie.findOne({ _id: id }).exec(function(err, movie) {
    callback(movie);
  });
};
