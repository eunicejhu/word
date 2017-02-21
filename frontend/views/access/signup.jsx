import React from "react";
// import $ from "jquery";
import {signup as signupAction} from "../../actions/UserActions";

const 
	USERNAME = 'username',
	PASSWORD = 'password',
	EMAIL = 'email',
	VERIFY_PASSWORD = 'verify-password';

export default class Signup extends React.Component{

	constructor() {
		super();

		this.state = {
			passwordIsVerified: true
		}

		this.signup = this.signup.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}

	handleBlur() {
		let 
			$signupForm = $(this.refs.signupForm),
			password = $('#'+PASSWORD, $signupForm).val(),
			verify_password = $('#'+VERIFY_PASSWORD, $signupForm).val();

		this.setState({
			passwordIsVerified: password === verify_password
		});
	}

	signup(e) {
		e.preventDefault();
		var 
			$signupForm = $(this.refs.signupForm),
			user = {};

		user[USERNAME] = $('#'+USERNAME, $signupForm).val();
		user[PASSWORD] = $('#'+PASSWORD, $signupForm).val();
		user[EMAIL] = $('#'+EMAIL, $signupForm).val();

		this.state.passwordIsVerified && signupAction(user);
	}

	render() {
		let errorMessage = this.state.passwordIsVerified ? "" : "password is not the same";
		return (
			<div className="row"  >
				<div className="col-sm-12 col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3">
					<div className="well">
						<div className="text-info cursor font20" data-toggle="collapse" data-target="#signup" >
							<b >New to Word ? </b> <span> sign up </span>
						</div>
						<form id="signup" className="collapse voffset3" ref="signupForm" onSubmit={this.signup}>
							<div className="form-group">
								<label htmlFor={USERNAME}>
									Username:
								</label>
								<input type="text" required className="form-control" id={USERNAME} placeholder={USERNAME} />
							</div>
							<div className="form-group">
								<label htmlFor={PASSWORD}>
									Password:
								</label>
								<input type="password" required className="form-control" id={PASSWORD} placeholder="password" />
							</div>
							<div className="form-group">
								<label htmlFor={VERIFY_PASSWORD}>
									Verify password:
								</label>
								<input type="password" required onBlur={this.handleBlur} className="form-control" id={VERIFY_PASSWORD} placeholder="password" />
								<span className="text-danger">{errorMessage}</span>
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
}