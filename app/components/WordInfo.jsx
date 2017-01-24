var React = require('react');
var actions = require("../actions/WordActions");
var WordTag = require("./WordTag.jsx");
var _ = require("underscore");

module.exports = React.createClass({
	getInitialState: function() {
		return {
			word: this.props.word
		}
	},
	componentWillReceiveProps: function(nextProps) {
		this.setState({
			word: nextProps.word
		});
	},
	editWord: function(e) {
		e.preventDefault();
		actions.updateWord(this.state.word);
	},
	deleteWord: function(e) {
		e.preventDefault();
		actions.deleteWord(this.state.word);
	},
	handleIsEditChange: function(e) {
		this.props.handleIsEditChange(e);
	},
	render: function() {
		return(
			<div className="panel panel-default">
				<div className="panel-heading">
				 	{this.state.word.name}
				 	<span>
				 		{
					 		this.state.word.tagline.map(function(tag, index) {

					 			return <WordTag tag={tag} key={"tag_"+index} />
				 			})
					 	}
				 	</span>
				 	<span className="pull-right leftset1 cursor text-uppercase delete-button glyphicon glyphicon-remove" onClick={this.deleteWord} ></span>
				 	<span className="pull-right text-uppercase cursor edit-button glyphicon glyphicon-edit" id={this.state.word._id} onClick={this.handleIsEditChange} data-toggle="modal" data-target="#editWord"></span>
				 	
				</div>
				<div className="panel-body">
					{this.state.word.description}
				</div>
			</div>
		)
	}
});