var express = require('express');
var app = express();

// config the server
var config = require('./app/config/config');

// set up middleware
require('./app/config/express')(app, config);

// set up the mongodb connection
var db = require('./app/config/mongoose')(config);

// set up passport authentication and middleware
require('./app/config/passport')();

// set up routes
require('./app/config/routes')(app);

app.listen(config.port, function() {
  console.log("listening on port " + config.port);
});
