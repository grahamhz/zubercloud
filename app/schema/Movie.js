var mongoose = require('mongoose');

//establish a movie schema and model
var movieSchema = mongoose.Schema({
  imdb: String,
  title: String,
  year: Number,
  plot: String,
  tagline: String,
  img_url: String,
  runtime: Number,
  dateAdded: Date,
  featured: Boolean,
  tags: [String]
});


var Movie = mongoose.model('Movie', movieSchema);
