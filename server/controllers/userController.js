var mongoose = require("mongoose");
var User = require("../data/user");
var router = require("express").Router();
var _ = require("underscore");

mongoose.Promise = require("es6-promise");

var bcrypt = require("bcrypt-nodejs");

router.route("/signup:id?").post(addUser);
router.route("/login:id?").post(login);
router.route("/logout:id?").post(logout);

function addUser(req, res) {
	req.body.password = _make_pw_hash(req.body.password);
	var newUser = new User(_.extend({}, req.body));
	//hash password
	newUser.save(function(err, user) {
		if(err) {
			console.log(err);
			res.status(500).send(err.errmsg);
		} else {
			req.session.user = user;
			console.log("addUser: user", user);
			res.cookie("username", req.session.user.username, {path: '/'});
			res.cookie('_id', req.session.user._id, {path: '/'});
			res.json(user);
		}
	});
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
					console.log("success");
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