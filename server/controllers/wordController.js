var mongoose = require("mongoose");
var Word = require("../data/word");
var Util = require("../../util/util");
var _ = require("underscore");

var ENV_VARS = require("../../util/env_vars");

var redis = require("redis");
var redisClient = redis.createClient({host: ENV_VARS.host, port: ENV_VARS.redis_port});

// Word.find(function(err, words) {
// 	words.forEach(function(doc) {
// 		console.log("doc -------", doc);
// 		doc.description = doc.tagline;
// 		doc.tagline = '';
// 		doc.save();
// 	});
// });



redisClient.on("ready", function() {
	console.log("Redis is ready");
});
redisClient.on("error", function() {
	console.log("Error in Redis");
});

var router = require("express").Router();

router.route("/words/:param?")
.get(getWords)
.post(addWord)
.put(editWord)
.delete(deleteWord);

function _fetchUserFromSession(req) {
	return req.session.user;
}

function _clearCache(key) {
	redisClient.del(key, function(err_del, redisResult_del) {
		if(err_del) {
			throw err_del;
		} else {
			console.log("cache cleared");
		}
	});
}

function _setCache(key, value) {
	console.log("set Cache");
	redisClient.set(key, value, function(err, redisResult) {
		if(err) {
			return false;
		} else {
			return true;
		}
	});
}

function getWords(req, res) {
	var key = req.cookies.username;
	if(!req.session.user) {
		req.session.user = {username: req.cookies.username, _id: req.cookies._id};
	}
	redisClient.get(key, function(err_get, redisResult_get) {
		if(err_get) {
			console.log(err_get);
			return false;
		} else {
			if(redisResult_get) {
				res.json(JSON.parse(redisResult_get));
			} else {
				Word.find({createdBy: req.cookies._id})
					.populate({path: 'createdBy', select: 'username'})
					.exec(function(err, words) {
						if(err) {
							res.send(err);
						} else {
							_setCache(key, JSON.stringify(words));
							res.json(words);
						}
					});
			}
		}
	});
}

function addWord(req, res) {
	req.body.tagline = Util.stringToArray(req.body.tagline);
	req.body.createdBy = req.session.user._id;
	var word = new Word(_.extend({}, req.body));
	word.save(function(err) {
		if(err) {
			res.send(err);
		} else {
			var key = _fetchUserFromSession(req).username;
			_clearCache(key);
			res.json(word);
		}
	})
}

function editWord(req, res) {
	req.body.tagline = Util.stringToArray(req.body.tagline);
	Word.update({_id: req.body.id}, req.body, function(err) {
		if(err) {
			res.send(err);
		} else {
			var key = _fetchUserFromSession(req).username;
			_clearCache(key);
			res.json(word);
		}
	})
}

function deleteWord(req, res) {
	var id = req.params.param;
	Word.remove({_id: id}, function(err, removed) {
		if(err) {
			res.send(err);
		} else {
			var key = _fetchUserFromSession(req).username;
			_clearCache(key);
			res.json(removed);
		}
	})
}

module.exports = router;