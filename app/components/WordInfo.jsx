var React = require('react');
var actions = require("../actions/WordActions");

module.exports = React.createClass({
	deleteWord: function(e) {
		e.preventDefault();
		actions.deleteWord(this.props.info);
	},
	render: function() {
		return(
			<div className="panel panel-default">
				<div className="panel-heading">
				 	{this.props.info.name}
				 	<span className="pull-right text-uppercase delete-button" onClick={this.deleteWord} >&times; </span>
				</div>
				<div className="panel-body">
					{this.props.info.tagline}
				</div>
			</div>
		)
	}
});