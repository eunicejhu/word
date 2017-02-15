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
	deleteWord: function(e) {
		e.preventDefault();
		actions.deleteWord(this.state.word);
	},
	editWord: function() {
		this.props.handleIsEditChange(this.state.word._id);
	},
	eachTag: function(tag, i) {
		return (
			<WordTag tag={tag} key={i} />
		)
	},
	render: function() {
		return(
			<div className="panel panel-default">
				<div className="panel-heading">
				 	{this.state.word.name}
				 	<span>
				 		{
					 		this.state.word.tagline.map(this.eachTag)
					 	}
				 	</span>
				 	<span className="pull-right leftset1 cursor text-uppercase delete-button glyphicon glyphicon-remove" 
				 		onClick={this.deleteWord} >
			 		</span>
				 	<span className="pull-right text-uppercase cursor edit-button glyphicon glyphicon-edit" 
			 			data-toggle="modal" 
			 			data-target="#editWord" 
				 		onClick={this.editWord} >
			 		</span>
				 	
				</div>
				<div className="panel-body">
					{this.state.word.description}
				</div>
			</div>
		)
	}
});