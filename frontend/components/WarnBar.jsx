import React from "react";
import ReactDOM from "react-dom";

export default class WarnBar extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			error: props.error,
			warnBarVisibility: {display: (props.error != null)? 'block' : 'none'}
		}

		this.toggleWarnBar = this.toggleWarnBar.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			error: nextProps.error,
			warnBarVisibility: {display: (nextProps.error != null)? 'block' : 'none'}
		});
		this.forceUpdate();
	}

	toggleWarnBar() {
		this.setState({
			warnBarVisibility: {display: 'none'}
		});		
	}

	render() {
		if(!this.state.error) {
			return null;
		}
		return (
			<div className="alert alert-danger alert-dismissable fade in" style={this.state.warnBarVisibility} >
				<a href="#" className="close" onClick={this.toggleWarnBar} aria-label="close">&times;</a>
			  	<strong>{this.state.error? this.state.error.responseText : ''}!</strong> 
			</div>
		)
	}
}