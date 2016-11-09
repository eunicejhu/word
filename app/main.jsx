var React = require("react");
var ReactDOM = require("react-dom");
var WordList = require("./components/WordList.jsx");
var WordStore = require("./stores/wordStore");

var _words = WordStore.getWords();

WordStore.onChange(function(words) {
	_words = words;
	render();
});

function render() {
	ReactDOM.render(
		<WordList words={_words} />,
		document.getElementById("container")
	);
}

render();