import * as Guid from "guid";

var listeners = {};

function dispatch(payload) {
	for(var id in listeners) {
		listeners[id](payload);
	}
}

function register(cb) {
	var id = Guid.create();
	listeners[id] = cb;
}

export {dispatch, register};