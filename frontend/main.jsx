import React from "react";
import ReactDOM from "react-dom";

import * as WordStore from "./stores/wordStore";
import * as UserStore from "./stores/userStore";
import {getCookie} from "../util/util";

import Header from "./views/access/header.jsx";
import WarnBar from "./components/WarnBar.jsx";
import SignUp from "./views/access/signup.jsx";
import Login from "./views/access/login.jsx";

import WordList from "./components/WordList.jsx";
// import LeftSideBar from "./components/LeftSideBar.jsx";


class WordMainInterface extends React.Component{

	constructor() {
		super();
		this.state = {
			_user: {username: getCookie('username')},
			_words: [],
			error: null
		};

		this.getWordsCallback = this.getWordsCallback.bind(this);
		this.accessCallback = this.accessCallback.bind(this);
	}

	getWordsCallback(words) {
		this.setState({
			_words: words	
		});
	}

	accessCallback(response) {
		console.log("accessCallback this:", this);
		if(response.status && response.status != 200) {
			this.setState({
				error: {status: response.status, responseText: response.responseText}
			});
		} else {
			var username = getCookie('username');
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
	}

	componentDidMount() {
		if(this.state._user && this.state._user.username) {
			this._getWords();
		}
		UserStore.onChange(this.accessCallback);
		WordStore.onChange(this.getWordsCallback);
	}

	_getWords() {
		//load all words
		WordStore.getWords(this.getWordsCallback);
	}
	
	render() {
		var hasUser = this.state._user && this.state._user.username;
		return (
			<div>
				<Header user={this.state._user} />
				<WarnBar error={this.state.error} />
				<div className="container">
					{	hasUser?(
							<div className="row">
								<WordList words={this.state._words} />
							</div>
							
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
}

ReactDOM.render(
	<WordMainInterface />,
	document.getElementById("container")
);
