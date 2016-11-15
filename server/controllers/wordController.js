var mongoose = require("mongoose");
var Word = require("../data/word");
var Util = require("../../util/util");
var _ = require("underscore");

// Word.find(function(err, words) {
// 	words.forEach(function(doc) {
// 		console.log("doc -------", doc);
// 		doc.description = doc.tagline;
// 		doc.tagline = '';
// 		doc.save();
// 	});
// });
var router = require("express").Router();
router.route("/").get(getWords);

router.route("/words/:id?")
.get(getWords)
.post(addWord)
.put(editWord)
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
	console.log("addWord ", req.body);
	req.body.tagline = Util.stringToArray(req.body.tagline);
	var word = new Word(_.extend({}, req.body));
	word.save(function(err) {
		if(err) {
			res.send(err);
		} else {
			res.json(word);
		}
	})
}

function editWord(req, res) {
	console.log("editWord ", req.body);
	req.body.tagline = Util.stringToArray(req.body.tagline);
	Word.update({_id: req.body.id}, req.body, function(err) {
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