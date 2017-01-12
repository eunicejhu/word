var React = require("react");
var ReactDOM = require("react-dom");

module.exports = React.createClass({
		getInitialState: function() {
			return {
				error: this.props.error,
				warnBarVisibility: {display: (this.props.error != null)? 'block' : 'none'}
			}
		},

		componentWillReceiveProps: function(nextProps) {
			this.setState({
				error: nextProps.error,
				warnBarVisibility: {display: (nextProps.error != null)? 'block' : 'none'}
			});
			this.forceUpdate();
		},

		toggleWarnBar: function(e) {
			this.setState({
				warnBarVisibility: {display: 'none'}
			});		
		},

		render: function() {
			return (
				<div className="alert alert-danger alert-dismissable fade in" style={this.state.warnBarVisibility} >
					<a href="#" className="close" onClick={this.toggleWarnBar} aria-label="close">&times;</a>
				  	<strong>{this.state.error? this.state.error.responseText : ''}!</strong> 
				</div>
			)
		}
	})