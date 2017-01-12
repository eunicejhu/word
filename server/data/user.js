var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	email: String,
	createdOn: {type: Date, 'default': Date.now}
});

userSchema.static('findByUserName', function(username, callback) {
	return this.find({username: username}, callback);
});
module.exports = mongoose.model("user", userSchema);