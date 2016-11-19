var React = require("react");

module.exports = React.createClass({
	render: function() {
		return (
			<span className="label label-info margin">{this.props.tag}</span>
		)
	}
});