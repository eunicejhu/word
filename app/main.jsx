var React = require("react");
var ReactDOM = require("react-dom");
var WordList = require("./components/WordList.jsx");
var WordStore = require("./stores/wordStore");


var WordMainInterface = React.createClass({
	getInitialState: function() {
		return {
			_words: []
		};
	},
	getWordsCallback: function(words) {
		this.setState({
			_words: words	
		});
	},
	componentDidMount: function() {
		//load all words
		WordStore.getWords(this.getWordsCallback);
		WordStore.onChange(this.getWordsCallback);
	},
	
	render: function() {
		return (
			<WordList words={this.state._words} />
		)
	}
});

ReactDOM.render(
	<WordMainInterface />,
	document.getElementById("container")
);
