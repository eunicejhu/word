var React = require("react");
var actions = require("../../actions/UserActions");

const 
	USERNAME = 'username',
	PASSWORD = 'password',
	REMEMBER = 'remember';

module.exports = React.createClass({
	login: function(e) {
		e.preventDefault();
		var 
			$loginForm = $(e.target),
			user = {};

		user[USERNAME] = $('#'+USERNAME, $loginForm).val();
		user[PASSWORD] = $('#'+PASSWORD, $loginForm).val();
		user[REMEMBER] = $('#'+REMEMBER, $loginForm).is(":checked");

		actions.login(user);
	},
	render: function() {
		
		return (
			<div className="row" >
				<div className="col-sm-12 col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3">
					<form className="well" onSubmit={this.login}>
						<div className="form-group">
							<label htmlFor={USERNAME}>
								Username:
							</label>
							<input type="text" className="form-control" id={USERNAME} placeholder={USERNAME} />
						</div>
						<div className="form-group">
							<label htmlFor={PASSWORD}>
								Password:
							</label>
							<input type="password" className="form-control" id={PASSWORD} placeholder="password" />
						</div>
						<div className="checkbox"> 
							<label>
								<input type="checkbox" id={REMEMBER} /> Remember me
							</label>
						</div>
						<button className="btn cursor btn-info"> Log in </button>
					</form>
				</div>
			</div>
		)
	}
});