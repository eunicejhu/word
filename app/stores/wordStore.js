var dispatcher = require("../dispatcher");

function WordStore() {
	var listeners = [];
	var words = [
		{name: "Bonjour", tagline: "greeting"},
		{name: "Au revoir", tagline: "goodbye"},
		{name: "Bonne Chance", tagline: "good luck"}
	];

	function getWords() {
		return words;
	}

	function onChange(listener) {
		console.log("onchange listener --: ", listener);
		listeners.push(listener);
	}

	function addWord(word) {
		words.push(word);
		triggerListeners();
	}

	function deleteWord(word) {
		words.map(function(w, index) {
			if(w.name === word.name) {
				_index = index;
			}
		});
		words.splice(_index, 1);
		triggerListeners();
	}

	function triggerListeners() {
		listeners.forEach(function(listener) {
			console.log('listener :', listener);
			listener(words);
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