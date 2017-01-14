var React = require("react");
var ReactDOM = require("react-dom");
var actions = require("../../actions/UserActions");

module.exports = React.createClass({
		getInitialState: function() {
			return {
				user: this.props.user
			}
		},
		logout: function(e) {
			console.log("logout");
			e.preventDefault();
			actions.logout(this.state.user);
		},

		componentWillReceiveProps(nextProps) {
			if(nextProps.user != this.state.user) {
				console.log("not the same")
				this.setState({
					user: nextProps.user
				});
			}
		},

		render: function() {
			var profileVisibility = {display: (this.state.user && this.state.user.username)? 'block' : 'none'};
			return (
				<div className="navbar navbar-default">
			        <div className="container-fluid">
			            <div className="navbar-header">
			                <a className="navbar-brand" href="#">Word</a>
			            </div>
			            <ul className="nav navbar-nav navbar-right" style={profileVisibility}>
					      <li><a href="#"><span className="glyphicon glyphicon-user"></span> {this.state.user.username}</a></li>
					      <li><a href="#" onClick={this.logout} ><span className="glyphicon glyphicon-log-in" ></span> Logout</a></li>
					    </ul>
			        </div>
			    </div>
			)
		}
	})