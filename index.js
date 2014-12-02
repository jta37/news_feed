// index.js
// load express module
var express = require("express");
// create an app
var app = express();
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded());
app.set("view engine", "ejs");

	var articles = [{title: "Wanderer", author: "Yawgnimeh"}]


app.get("/articles", function (req, res) {
	res.render("articles/index.ejs", {news: articles});
});

app.get("/articles/new", function (req, res) {
	res.render("articles/new.ejs");
});



app.get("/", function (req, res) {
	res.render("site/index.ejs");
});


app.get("/about", function (req, res) {
	res.render("site/about.ejs");
});


app.get("/contact", function (req, res) {
	res.render("site/contact.ejs");
});

app.listen(3000, function(){
	console.log("LISTENING!");
});