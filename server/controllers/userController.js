var mongoose = require("mongoose");
var User = require("../data/user");
var router = require("express").Router();
var _ = require("underscore");

var bcrypt = require("bcrypt-nodejs");

router.route("/signup:id?").post(addUser);
router.route("/login:id?").post(login);
router.route("/logout:id?").post(logout);

function addUser(req, res) {
	req.body.password = _make_pw_hash(req.body.password);
	var user = new User(_.extend({}, req.body));
	//hash password
	user.save(function(err, user) {
		if(err) {
			res.send(err);
		} else {
			req.session.user = user[0];
			res.cookie("username", user[0].username, {path: '/'});
			res.cookie('_id', user[0]._id, {path: '/'});
			res.json(user);
		}
	})
}

function login(req, res) {
	User.findByUserName(req.body.username, function(err, user) {
		if(err) {
			res.send(err);
		} else {
			try{
				if(user.length == 0) {
					res.status(500).send('user does not exist ');
				} else if(bcrypt.compareSync(req.body.password, user[0].password)){
					req.session.user = user[0];
					res.cookie("username", user[0].username, {path: '/'});
					res.cookie('_id', user[0]._id, {path: '/'});
					res.json(user);
				} else {
					res.status(500).send('wrong password ')			
				}
			} catch(e) {
				res.status(500).send('wrong password ')	
			}
			
		}
	})
}

function logout(req, res) {
	User.findByUserName(req.body.username, function(err, user) {
		if(err) {
			res.send(err);
		} else {
			res.clearCookie('username', {path: '/'});
			res.clearCookie('_id', {path: '/'});
			res.json({});
		}
	})
}

function _make_pw_hash(password) {
	return bcrypt.hashSync(password);
}

module.exports = router;