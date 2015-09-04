var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')({
  secret: 'zubercloud piper colorado dinosaur',
  saveUninitialized: true,
  resave: true
});
var passport = require('passport');

module.exports = function(app, config) {

  app.use(logger('dev'));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(session);
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(config.rootpath + '/public'));

  return session;

};
