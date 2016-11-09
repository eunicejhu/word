var dispatcher = require("../dispatcher");

module.exports = {
	addWord: function(word) {
		dispatcher.dispatch({
			word: word,
			type: "word:addWord"
		});
	},
	deleteWord: function(word) {
		dispatcher.dispatch({
			word: word,
			type: "word:deleteWord"
		});
	}
}