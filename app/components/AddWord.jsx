var React = require("react");
var $ = require("jquery");
var _ = require("underscore");
var actions = require("../actions/WordActions");
var ENV_VARS = require("../../util/env_vars");



module.exports = React.createClass({
	getInitialState: function() {
		return {
			word: this.props.word !=null? this.props.word : {},
			actionType: this.props.actionType
		}
	},
	//to comment, this cause problems
	componentWillReceiveProps: function(nextProps) {
		var isAddWord = this.state.actionType == ENV_VARS.HANDLE_WORD_ADD;
		if(!isAddWord) {
			this.setState({
				word: nextProps.word
			});
		}
	},
	addWord: function(e) {
		
		var $form = $(e.target);
		var word = {};

		e.preventDefault();
		
		actions.addWord(this.state.word);

		$form.find("#name").val('');
		$form.find("#description").val('');
		$form.find("#tagline").val('');

		word['name'] = $form.find("#name").val();
		word['description'] = $form.find("#description").val();
		word['tagline'] = $form.find("#tagline").val();
		this.setState({
				word: word
			});

	},
	editWord: function(e) {
		e.preventDefault();
		actions.editWord(this.state.word);

	},
	handleInputChange: function(e) {
		e.preventDefault();
		let word = $.extend({}, this.state.word);
		let updateWord = {};
		updateWord[e.target.name] = e.target.value;

		$.extend(word, updateWord);
		this.setState({
			word: word
		});
	},
	render: function() {
		var isAddWord = this.state.actionType == ENV_VARS.HANDLE_WORD_ADD;
		var wordIsValid = this.state.word != null && typeof this.state.word != "undefined";
		
		return(
			<form className="form" onSubmit={ isAddWord ? this.addWord : this.editWord}>
				<div className="form-group">
					<label className="control-label" htmlFor="name">Word: </label>
					<input type="text" className="form-control" id="name" name="name" value={!(wordIsValid && (typeof this.state.word.name != "undefined"))? "" : this.state.word.name} onChange={this.handleInputChange} placeholder="Word"  />
				</div>
				<div className="form-group">
					<label className="control-label" htmlFor="description">Description:</label>
                    <input type="text" className="form-control" id="description" name="description" value={!(wordIsValid && (typeof this.state.word.description != "undefined"))? "" : this.state.word.description} onChange={this.handleInputChange} placeholder="Description" />
				</div>
				<div className="form-group">
					<label className="control-label" htmlFor="tagline">Tags:</label>
                    <input type="text" className="form-control" id="tagline" name="tagline" value={!(wordIsValid && (typeof this.state.word.tagline != "undefined"))? "" : this.state.word.tagline} onChange={this.handleInputChange} placeholder="Tags: tag1,tag2" />
				</div>
				<div className="form-group">
					<button className="btn btn-info" data-dismiss={isAddWord? "" : ""} type="submit">{isAddWord? "Add" : "Update"} word</button>
				</div>
			</form>
		);
	}
});