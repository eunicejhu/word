var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");

var wordController = require("./controllers/wordController");

var app = express();
console.log("__dirname", __dirname);
app.use(express.static(path.join(__dirname, "../app/dist")));
app.use(bodyParser.json());
app.use("/", wordController);
app.use("/api", wordController);

app.listen(1111, function() {
	console.log('Started listening on port ', 1111);
});

mongoose.connect("mongodb://localhost/wordfinder")
