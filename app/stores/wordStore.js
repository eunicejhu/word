var dispatcher = require("../dispatcher");
var wordService = require("../services/wordService");

function WordStore() {
	var listeners = [];

	function onChange(listener) {
		listeners.push(listener);
	}

	function getWords(callback) {
		wordService.getWords().then(function(res) {
			callback(res);
		});
	}

	function addWord(word) {
		wordService.addWord(word).then(function(res) {
			console.log(res);
			triggerListeners();
		});
	}

	function editWord(word) {
		wordService.editWord(word).then(function(res) {
			console.log(res);
			triggerListeners();
		});
	}


	function deleteWord(word) {
		wordService.deleteWord(word).then(function(res) {
			console.log(res);
			triggerListeners();
		})
		
	}

	function triggerListeners() {
		getWords(function(res) {
			listeners.forEach(function(listener) {
				listener(res);
			})
		})
		
	}

	dispatcher.register(function(payload) {
		var split = payload.type.split(":");
		if(split[0] === "word") {
			switch(split[1]) {
				case "addWord":
					addWord(payload.word);
					break;
				case "deleteWord":
					deleteWord(payload.word);
					break;
			}
		}
	});

	return {
		getWords: getWords,
		onChange: onChange
	}
}
module.exports = WordStore();