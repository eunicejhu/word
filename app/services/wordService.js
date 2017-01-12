var $ = require("jquery");
var ENV_VARS = require("../../util/env_vars");
var promise = require("es6-promise");
var resourceUrl = ENV_VARS.app_url + "/api/words";

module.exports = {
	addWord: function(word) {
		var Promise = promise.Promise;
		return new Promise(function(resolve, reject) {
			$.ajax({
				url: resourceUrl,
				data: JSON.stringify(word),
				method: "POST",
				dataType: "json",
				contentType: "application/json",
				success: resolve,
				error: reject
			});
		});
	},
	editWord: function(word) {
		var Promise = promise.Promise;
		return new Promise(function(resolve, reject) {
			$.ajax({
				url: resourceUrl,
				data: JSON.stringify(word),
				method: "PUT",
				dataType: "json",
				contentType: "application/json",
				success: resolve,
				error: reject
			});
		});
	},
	getWords: function() {
		var Promise = promise.Promise;
		return new Promise(function(resolve, reject) {
			$.ajax({
				url: resourceUrl,
				method: "GET",
				dataType: "json",
				success: resolve,
				error: reject
			});
		});
	},
	deleteWord: function(word) {
		var Promise = promise.Promise;
		return new Promise(function(resolve, reject) {
			$.ajax({
				url: resourceUrl + "/" + word._id,
				method: "DELETE",
				success: resolve,
				error: reject
			})
		})
	}
}