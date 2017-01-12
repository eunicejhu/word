var $ = require("jquery");
var ENV_VARS = require("../../util/env_vars");
var Promise = require("es6-promise").Promise;
require("../../util/env_vars");
var app_url = ENV_VARS.app_url;
var resourceUrl = app_url + "/access";



module.exports = {
	signup: function(user) {
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
	},
	login: function(user) {
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
	},
	logout: function(user) {
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
}