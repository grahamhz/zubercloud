var mongoose = require('mongoose');
var encrypt = require('../utilities/encryption');


//establish a user login schema, method, and model
var userSchema = mongoose.Schema({
	first: { type: String, required: '{PATH} is required' },
	last: { type: String, required: '{PATH} is required' },
	username: {
    type: String,
    required: '{PATH} is required',
    unique: true
  },
	email: { type: String, required: '{PATH} is required' },
	salt: { type: String, required: '{PATH} is required' },
	hashed_pwd: { type: String, required: '{PATH} is required' },
	roles: [String]
});



userSchema.methods = {
	authenticate: function(password) {
		return encrypt.hashPwd(this.salt, password) === this.hashed_pwd;
	},
	hasRole: function(role) {
		return this.roles.indexOf(role) > -1;
	}
};



var User = mongoose.model('User', userSchema);
