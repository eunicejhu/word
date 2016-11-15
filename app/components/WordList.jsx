var React = require("react");
var WordInfo = require("./WordInfo.jsx");
var AddWord = require("./AddWord.jsx");
var SearchWord = require("./SearchWord.jsx");
var _ = require("underscore");

module.exports = React.createClass({
	getInitialState: function() {
		return {
			orderBy: "name",
			orderDir: "asc",
			queryText: "",
			words: this.props.words
		}
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
	render: function() {
		var filteredWords = [];
		var orderBy = this.state.orderBy;
		var orderDir = this.state.orderDir;
		var queryText = this.state.queryText;
		var words = this.state.words;

		words.forEach(function(word) {
			if(
				word.name.indexOf(queryText) != -1 || 
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
			<div className="row">
				<div className="col-md-6 col-md-offset-3">
					<AddWord />
				</div>
				<div className="col-md-6 col-md-offset-3">
					<SearchWord orderBy={orderBy} orderDir={orderDir} onReOrder={this.reOrder} onSearch={this.searchWords} />
				</div>
				<div className="col-md-6 col-md-offset-3 voffset3">
				 	{
				 		filteredWords.map(function(s,index){
				 			return(
				 				<WordInfo info={s} key={"word"+index} />
				 			)
				 		})
				 	}
				</div>
			</div>
		)
	}
});