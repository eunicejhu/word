import React from "react";
import {login as loginAction} from "../../actions/UserActions";

const 
	USERNAME = 'username',
	PASSWORD = 'password',
	REMEMBER = 'remember';

export default class Login extends React.Component{

	constructor() {
		super();

		this.login = this.login.bind(this);
	}

	login() {
		console.log("loginForm", this.refs.loginForm);
		var 
			$loginForm = $(this.refs.loginForm),
			user = {};

		user[USERNAME] = $('#'+USERNAME, $loginForm).val();
		user[PASSWORD] = $('#'+PASSWORD, $loginForm).val();
		user[REMEMBER] = $('#'+REMEMBER, $loginForm).is(":checked");

		loginAction(user);
	}

	render() {
		
		return (
			<div className="row" >
				<div className="col-sm-12 col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3">
					<form className="well" ref="loginForm" onSubmit={this.login}>
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
}