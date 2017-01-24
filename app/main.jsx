var React = require("react");
var ReactDOM = require("react-dom");
var WordList = require("./components/WordList.jsx");
var WordStore = require("./stores/wordStore");
var UserStore = require("./stores/userStore");
var Util = require("../util/util");

var Header = require("./views/access/header.jsx");
var WarnBar = require("./components/WarnBar.jsx")
var SignUp = require("./views/access/signup.jsx");
var Login = require("./views/access/login.jsx");


var WordMainInterface = React.createClass({

	getInitialState: function() {
		return {
			_user: {username: Util.getCookie('username')},
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
			var username = Util.getCookie('username');
			this.setState({
				_user: {username: username},
				error: null
			});
			if(typeof username != "undefined" && username) {
				this._getWords();
			} else {
				this.setState({
					_words: []
				});
			}
		}
	},
	componentDidMount: function() {
		if(this.state._user && this.state._user.username) {
			this._getWords();
		}
		UserStore.onChange(this.accessCallback);
		WordStore.onChange(this.getWordsCallback);
	},
	_getWords: function() {
		//load all words
		WordStore.getWords(this.getWordsCallback);
	},
	
	render: function() {
		var hasUser = this.state._user && this.state._user.username;
		return (
			<div>
				<Header user={this.state._user} />
				<WarnBar error={this.state.error} />
				<div className="container">
					{	hasUser?(
							<WordList words={this.state._words} />
						) : (
							<div>
								<Login />
								<SignUp />
							</div>
						)
					}
				</div>
			</div>
		)
	}
});

ReactDOM.render(
	<WordMainInterface />,
	document.getElementById("container")
);
