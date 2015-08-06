var path = require('path');
var rootpath = path.normalize(__dirname + '/../../');

var port = 8888;

var db = 'mongodb://localhost/zubercloud';

//export config information for the server and db
module.exports = {
	rootpath: rootpath,
	port: port,
	db: db
};
