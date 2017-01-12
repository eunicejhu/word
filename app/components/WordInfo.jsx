var React = require('react');
var actions = require("../actions/WordActions");
var WordTag = require("./WordTag.jsx");
var _ = require("underscore");

module.exports = React.createClass({
	editWord: function(e) {
		e.preventDefault();
		actions.updateWord(this.props.info)
	},
	deleteWord: function(e) {
		e.preventDefault();
		actions.deleteWord(this.props.info);
	},
	render: function() {
		return(
			<div className="panel panel-default">
				<div className="panel-heading">
				 	{this.props.info.name}
				 	<span>
				 		{
					 		this.props.info.tagline.map(function(tag, index) {
					 			return <WordTag tag={tag} key={"tag_"+index} />;
				 			})
					 	}
				 	</span>
				 	<span className="pull-right text-uppercase delete-button glyphicon glyphicon-remove" onClick={this.deleteWord} ></span>
				</div>
				<div className="panel-body">
					{this.props.info.description}
				</div>
			</div>
		)
	}
});