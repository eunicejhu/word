var dispatcher = require("../dispatcher");

module.exports = {
	signup: function(user) {
		dispatcher.dispatch({
			user: user,
			type: "user:signup"
		});
	},
	login: function(user) {
		dispatcher.dispatch({
			user: user,
			type: "user:login"
		})
	},
	logout: function(user) {
		dispatcher.dispatch({
			user: user,
			type: "user:logout"
		})
	}

}