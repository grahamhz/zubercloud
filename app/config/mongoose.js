var mongoose = require('mongoose');
var User = require('../schema/User');
var Movie = require('../schema/Movie');

module.exports = function(config) {

	//set up the database connection
	mongoose.connect(config.db);
	var db = mongoose.connection;

	//set up logging
	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function callback() {
		console.log('Database opened.');
	});

	//set up the return object
	var db = {
		mongoose: mongoose,
		connection: db,
	}

	return db;

};
