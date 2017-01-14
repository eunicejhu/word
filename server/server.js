var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var mongoose = require("mongoose");
var path = require("path");

var wordController = require("./controllers/wordController");
var userController = require("./controllers/userController");

var app = express();
app.use(express.static(path.join(__dirname, "../app/dist")));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session(
	{
		secret: "CREDENTIAL", 
		resave: false, 
		saveUninitialized: true, 
		cookie: {}
	}));
app.use("/", wordController);
app.use("/api", wordController);
app.use("/access", userController);

app.listen(8182, function() {
	console.log('Started listening on port ', 8182);
});

mongoose.connect("mongodb://localhost/wordfinder")
