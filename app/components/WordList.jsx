var React = require("react");
var WordInfo = require("./WordInfo.jsx");
var AddWord = require("./AddWord.jsx");
var EditWord = require("./EditWord.jsx");
var SearchWord = require("./SearchWord.jsx");
var _ = require("underscore");
var $ = require("jquery");
var ENV_VARS = require("../../util/env_vars");

module.exports = React.createClass({
	
	getInitialState: function() {
		return {
			orderBy: "name",
			orderDir: "asc",
			queryText: "",
			words: this.props.words,
			isEdit: false,
			wordInEdit: null
		}
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({
			words: nextProps.words,
			isEdit: false,
			wordInEdit: null
		});
	},
	reOrder: function(orderBy, orderDir) {
		this.setState({
			orderBy: orderBy,
			orderDir: orderDir
		});
	},
	searchWords: function(queryText) {
		this.setState({
			queryText: queryText
		});
	},
	handleIsEditChange: function(_id) {
		var wordInEdit = this.state.words.find((word) => {
			return word._id == _id;
		});
		this.setState({
			isEdit: true,
			wordInEdit: wordInEdit
		});
	},
	eachWord: function(word, i) {
		return (
			<WordInfo 	key={i}
						word={word} 
						handleIsEditChange={this.handleIsEditChange} >
			</WordInfo>
		)
	},
	render: function() {
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
					<AddWord actionType={ENV_VARS.HANDLE_WORD_ADD} />
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
});