var mongoose = require("mongoose");
var Word = require("../data/word");
var _ = require("underscore");

console.log("inside wordController ----");
var router = require("express").Router();
router.route("/").get(getWords);

router.route("/words/:id?")
.get(getWords)
.post(addWord)
.delete(deleteWord);

function getWords(req, res) {
	Word.find(function(err, words) {
		console.log("getWords", words);
		if(err) {
			res.send(err);
		} else {
			res.json(words);
		}
	})
}

function addWord(req, res) {
	console.log("addWord");
	var word = new Word(_.extend({}, req.body));
	word.save(function(err) {
		if(err) {
			res.send(err);
		} else {
			res.json(word);
		}
	})
}

function deleteWord(req, res) {
	var id = req.params.id;
	Word.remove({_id: id}, function(err, removed) {
		if(err) {
			res.send(err);
		} else {
			res.json(removed);
		}
	})
}

module.exports = router;