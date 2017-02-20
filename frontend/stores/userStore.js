import {register} from "../dispatcher";
import * as userService from "../services/userService";

var listeners = [];

function onChange(listener) {
	listeners.push(listener);
}

function login(user) {
	userService.login(user).then(function(res) {
		triggerListeners(res);
	}, function(err) {
		triggerListeners(err);
	});
}

function signup(user) {
	userService.signup(user).then(function(res) {
		triggerListeners(res);
	}, function(err) {
		triggerListeners(err);
	});
}

function logout(user) {
	userService.logout(user).then(function(res) {
		triggerListeners(res);
	});
}

function triggerListeners(res) {
	listeners.forEach(function(listener) {
		listener(res);
	});
}

register(function(payload){
	var split = payload.type.split(":");
	if(split[0] === "user") {
		switch(split[1]) {
			case "login":
				login(payload.user);
				break;
			case "signup": 
				signup(payload.user);
				break;
			case "logout":
				logout(payload.user);
		}
	}
});


export {onChange};