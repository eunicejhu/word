import {dispatch} from "../dispatcher";

function signup(user) {
	dispatch({
		user: user,
		type: "user:signup"
	});
}

function login(user) {
	dispatch({
		user: user,
		type: "user:login"
	})
}

function logout(user) {
	dispatch({
		user: user,
		type: "user:logout"
	})
}

export {signup, login, logout};