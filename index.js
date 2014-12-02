// index.js
// load express module
var express = require("express");
// create an app
var app = express();
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded());
app.set("view engine", "ejs");


app.get("/articles", function (req, res) {
	res.render("articles/index.ejs");
});

app.get("/articles/new", function (req, res) {
	res.render("articles/new.ejs");
});



app.get("/", function (req, res) {
	res.send("<b>Welcome WDI 15");
});


app.get("/site/about", function (req, res) {
	res.render("site/about.ejs");
});


app.get("/site/contact", function (req, res) {
	res.render("site/contact.ejs");
});

app.listen(3000, function(){
	console.log("LISTENING!");
});