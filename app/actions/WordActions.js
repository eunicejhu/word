var dispatcher = require("../dispatcher");

module.exports = {
	addWord: function(word) {
		dispatcher.dispatch({
			word: word,
			type: "word:addWord"
		});
	},
	editWord: function(word) {
		dispatcher.dispatch({
			word: word,
			type: "word:editWord"
		})
	},
	deleteWord: function(word) {
		dispatcher.dispatch({
			word: word,
			type: "word:deleteWord"
		});
	}
}