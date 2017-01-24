var React = require("react");
var $ = require("jquery");
var actions = require("../../actions/UserActions");

const 
	USERNAME = 'username',
	PASSWORD = 'password',
	EMAIL = 'email',
	VERIFY_PASSWORD = 'verify-password';

module.exports = React.createClass({
	signup: function(e) {
		e.preventDefault();
		var 
			$signupForm = $(e.target),
			user = {};

		user[USERNAME] = $('#'+USERNAME, $signupForm).val();
		user[PASSWORD] = $('#'+PASSWORD, $signupForm).val();
		user[EMAIL] = $('#'+EMAIL, $signupForm).val();

		actions.signup(user);

	},
	render: function() {

		return (
			<div className="row"  >
				<div className="col-sm-12 col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3">
					<div className="well">
						<div className="text-info cursor font20" data-toggle="collapse" data-target="#signup" >
							<b >New to Word ? </b> <span> sign up </span>
						</div>
						<form id="signup" className="collapse voffset3" onSubmit={this.signup}>
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
							<div className="form-group">
								<label htmlFor={VERIFY_PASSWORD}>
									Verify password:
								</label>
								<input type="password" className="form-control" id={VERIFY_PASSWORD} placeholder="password" />
							</div>
							<div className="form-group">
								<label htmlFor={EMAIL}>
									Email (optional):
								</label>
								<input type="email" className="form-control" id={EMAIL} placeholder="user@example.com" />
							</div>
							<button className="btn btn-info"> Sign up </button>
						</form>
					</div>
				</div>
			</div>
		)
	}
});