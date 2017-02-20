import React from "react";
import _ from "underscore";
// import $ from "jquery";
import {addWord as addWordAction, editWord as editWordAction} from "../actions/WordActions";
import {word_actions} from "../../util/env_vars";

export default class AddWord extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			word: props.word !=null? props.word : {},
			actionType: props.actionType
		}

		this.addWord = this.addWord.bind(this);
		this.editWord = this.editWord.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	//to comment, this cause problems
	componentWillReceiveProps(nextProps) {
		var isAddWord = this.state.actionType == word_actions.ADD;
		if(!isAddWord) {
			this.setState({
				word: nextProps.word
			});
		}
	}

	addWord() {
		
		var $form = $(this.refs.addWordForm);
		var word = {};

		addWordAction(this.state.word);

		$form.find("#name").val('');
		$form.find("#description").val('');
		$form.find("#tagline").val('');

		word['name'] = $form.find("#name").val();
		word['description'] = $form.find("#description").val();
		word['tagline'] = $form.find("#tagline").val();
		this.setState({
				word: word
			});

	}

	editWord() {
		editWordAction(this.state.word);

	}

	handleInputChange(e) {
		e.preventDefault();
		let word = $.extend({}, this.state.word);
		let updateWord = {};
		updateWord[e.target.name] = e.target.value;

		$.extend(word, updateWord);
		this.setState({
			word: word
		});
	}

	render() {
		var isAddWord = this.state.actionType == word_actions.ADD;
		var wordIsValid = this.state.word != null && typeof this.state.word != "undefined";
		
		return(
			<form className="form" ref="addWordForm" onSubmit={ isAddWord ? this.addWord : this.editWord}>
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
}