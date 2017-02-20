import React from "react";
import WordInfo from "./WordInfo.jsx";
import AddWord from "./AddWord.jsx";
import EditWord from "./EditWord.jsx";
import SearchWord from "./SearchWord.jsx";
import _ from "underscore";
// import $ from "jquery";
import {word_actions} from "../../util/env_vars";

export default class WordList extends React.Component{
	
	constructor(props) {
		super(props);
		this.state = {
			orderBy: "name",
			orderDir: "asc",
			queryText: "",
			words: props.words,
			isEdit: false,
			wordInEdit: null
		}

		this.reOrder = this.reOrder.bind(this);
		this.searchWords = this.searchWords.bind(this);
		this.handleIsEditChange = this.handleIsEditChange.bind(this);
		this.eachWord = this.eachWord.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			words: nextProps.words,
			isEdit: false,
			wordInEdit: null
		});
	}

	reOrder(orderBy, orderDir) {
		this.setState({
			orderBy: orderBy,
			orderDir: orderDir
		});
	}

	searchWords(queryText) {
		this.setState({
			queryText: queryText
		});
	}

	handleIsEditChange(_id) {
		var wordInEdit = this.state.words.find((word) => {
			return word._id == _id;
		});
		this.setState({
			isEdit: true,
			wordInEdit: wordInEdit
		});
	}

	eachWord(word, i) {
		return (
			<WordInfo 	key={i}
						word={word} 
						handleIsEditChange={this.handleIsEditChange} >
			</WordInfo>
		)
	}

	render() {
		var filteredWords = [];
		var orderBy = this.state.orderBy;
		var orderDir = this.state.orderDir;
		var queryText = this.state.queryText;
		var words = this.state.words;

		words.forEach(function(word) {
			if(
				(word.name && word.name.indexOf(queryText) != -1) || 
				word.tagline.join(" ").indexOf(queryText) != -1 ||
				word.description.indexOf(queryText) != -1
			) {
				filteredWords.push(word);
			}
		});

		filteredWords = _.sortBy(filteredWords, orderBy);
		if(orderDir !== "asc") {
			filteredWords = filteredWords.reverse();
		}

		return(
			<div>
				<div className="col-sm-12 col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3">
					<AddWord actionType={word_actions.ADD} />
				</div>
				<EditWord 	isOpen={this.state.isEdit} 
							wordInEdit={this.state.wordInEdit} >
				</EditWord>
				<div className="col-sm-12 col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3">
					<SearchWord orderBy={orderBy} 
								orderDir={orderDir} 
								onReOrder={this.reOrder} 
								onSearch={this.searchWords} >
					</SearchWord>
				</div>
				<div className="col-sm-12 col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3 voffset3">
				 	{
				 		filteredWords.map(this.eachWord)
				 	}
				</div>
			</div>
		)
	}
}