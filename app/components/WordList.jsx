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
	handleIsEditChange: function(e) {
		var _id = $(e.target).attr("id");
		var wordInEdit = this.state.words.find((word) => {
			return word._id == _id;
		});
		this.setState({
			isEdit: true,
			wordInEdit: wordInEdit
		});
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
			<div className="row" >
				<div className="col-md-6 col-md-offset-3">
					<AddWord actionType={ENV_VARS.HANDLE_WORD_ADD} />
				</div>
				<EditWord isOpen={this.state.isEdit} wordInEdit={this.state.wordInEdit} />
				<div className="col-md-6 col-md-offset-3">
					<SearchWord orderBy={orderBy} orderDir={orderDir} onReOrder={this.reOrder} onSearch={this.searchWords} />
				</div>
				<div className="col-md-6 col-md-offset-3 voffset3">
				 	{
				 		filteredWords.map((s,index) => {
				 			return(
				 				<WordInfo word={s} key={"word"+index} handleIsEditChange={this.handleIsEditChange} />
				 			)
				 		})
				 	}
				</div>
			</div>
		)
	}
});