var React = require("react");
var ReactDOM = require("react-dom");
var WordList = require("./components/WordList.jsx");
var WordStore = require("./stores/wordStore");
var UserStore = require("./stores/userStore");
var Util = require("../util/util")

var Header = require("./views/access/header.jsx");
var WarnBar = require("./components/WarnBar.jsx")
var SignUp = require("./views/access/signup.jsx");
var Login = require("./views/access/login.jsx");


var WordMainInterface = React.createClass({
	getInitialState: function() {
		return {
			_user: Util.getCookie('username'),
			_words: [],
			error: null
		};
	},
	getWordsCallback: function(words) {
		this.setState({
			_words: words	
		});
	},
	accessCallback: function(response) {
		if(response.status && response.status != 200) {
			this.setState({
				error: {status: response.status, responseText: response.responseText}
			});
		} else {
			var username = Util.getCookie('username')
			this.setState({
				_user: username,
				error: null
			});
			if(username) {
				this._getWords();
			}
		}
		
	},
	componentDidMount: function() {
		if(this.state._user) {
			this._getWords();
		}
		UserStore.onChange(this.accessCallback);
	},

	_getWords: function() {
		//load all words
		WordStore.getWords(this.getWordsCallback);
		WordStore.onChange(this.getWordsCallback);
	},
	
	render: function() {
		return (
			<div>
				<Header user={this.state._user} />
				<WarnBar error={this.state.error} />
				<div className="container">
					<Login bodyVisible={this.state._user ? false : true} />
					<SignUp bodyVisible={this.state._user ? false : true} />
					<WordList bodyVisible={this.state._user ? true : false} words={this.state._words} />
				</div>
			</div>
			
		)
	}
});

ReactDOM.render(
	<WordMainInterface />,
	document.getElementById("container")
);
