import React from "react";
import ReactDOM from "react-dom";

import {logout as logoutAction} from "../../actions/UserActions";

export default class header extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user
		};

		this.logout = this.logout.bind(this);
	}

	logout() {
		console.log(this.refs.logoutButton, this.state.user);
		logoutAction(this.state.user);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.user != this.state.user) {
			this.setState({
				user: nextProps.user
			});
		}
	}

	render() {
		var profileVisibility = {display: (this.state.user && this.state.user.username)? 'block' : 'none'};
		return (
			<div className="navbar navbar-default">
		        <div className="container-fluid">
		            <div className="navbar-header">
		                <a className="navbar-brand" href="#">Word</a>
		            </div>
		            <ul className="nav navbar-nav navbar-right" style={profileVisibility}>
				      <li><a href="#"><span className="glyphicon glyphicon-user"></span> {this.state.user.username}</a></li>
				      <li><a href="#" ref="logoutButton" onClick={this.logout} ><span className="glyphicon glyphicon-log-in" ></span> Logout</a></li>
				    </ul>
		        </div>
		    </div>
		)
	}
}