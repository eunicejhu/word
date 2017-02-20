var mongoose = require("mongoose");
var wordSchema = mongoose.Schema({
	name: String,
	tagline: [String],
	description: String,
	createdOn: {type: Date, 'default': Date.now},
	createdBy: {type: mongoose.Schema.Types.ObjectId, ref:'user'}
});

wordSchema.static('findById', function (id, callback) {
  return this.find({ _id: id }, callback);
});

let word = mongoose.model("word", wordSchema);

module.exports = word;
