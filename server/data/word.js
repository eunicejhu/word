var mongoose = require("mongoose");
var wordSchema = mongoose.Schema({
	name: String,
	tagline: [String],
	description: String,
	createdOn: {type: Date, 'default': Date.now}
});

wordSchema.static('findById', function (id, callback) {
  return this.find({ _id: id }, callback);
});

module.exports = mongoose.model("word", wordSchema);