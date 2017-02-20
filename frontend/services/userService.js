var $ = require("jquery");
import {app} from "../../util/env_vars";
var Promise = require("es6-promise").Promise;
var resourceUrl = app.url + "/access";

function signup(user) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: resourceUrl+'/signup',
			data: JSON.stringify(user),
			method: 'POST',
			dataType: 'json',
			contentType: 'application/json',
			success: resolve,
			error: reject
		});
	});
}

function login(user) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: resourceUrl+'/login',
			data: JSON.stringify(user),
			method: 'POST',
			dataType: 'json',
			contentType: 'application/json',
			success: resolve,
			error: reject
		})
	});
}

function logout(user) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: resourceUrl+'/logout',
			data: JSON.stringify(user),
			method: 'POST',
			dataType: 'json',
			contentType: 'application/json',
			success: resolve,
			error: reject
		})
	})
}

export {signup, login, logout};

