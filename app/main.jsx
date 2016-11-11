var React = require("react");
var ReactDOM = require("react-dom");
var WordList = require("./components/WordList.jsx");
var WordStore = require("./stores/wordStore");

var _words = []; 
var getWordsCallback = function(words) {
	_words = words;
	render();
};
//load all words
WordStore.getWords(getWordsCallback);
WordStore.onChange(getWordsCallback);

function render() {
	ReactDOM.render(
		<WordList words={_words} />,
		document.getElementById("container")
	);
}

render();