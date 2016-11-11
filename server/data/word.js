var mongoose = require("mongoose");
var wordSchema = mongoose.Schema({
	name: String,
	tagline: String
});

module.exports = mongoose.model("word", wordSchema);