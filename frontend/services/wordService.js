var $ = require("jquery");
import {app} from "../../util/env_vars";
var promise = require("es6-promise");
var resourceUrl = app.url + "/api/words";

function addWord(word) {
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
}

function editWord(word) {
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
}

function getWords() {
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
}

function deleteWord(word) {
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

export {addWord, editWord, getWords, deleteWord};