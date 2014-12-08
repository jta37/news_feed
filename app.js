// index.js
// load express module
var express = require("express"),
  	bodyParser = require("body-parser"),
  	methodOverride = require("method-override"),
 	 	pg = require("pg"),
  	// create an app
  	app = express();

app.use(methodOverride("_method"))
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
	
var articleCount = 2;
var articles = [ 
	
	{ id: 1,
    title: 'WDI in a Nut Shell',
    summary: 'We will never know everything, we will always forget, learn to google and ask the right questions.' },
  { id: 2,
    title: 'WDI in a Nut Shell',
    summary: 'We will never know everything, we will always forget, learn to google and ask the right questions.' },
  ];


	var config = {
  database: "daily_planet",
  port: 5432,
  host: "localhost"
};

app.get("/articles", function (req, res) {
  pg.connect(config, function(err, client, done){
        if (err) {
             console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
        }
        client.query("SELECT * FROM articles", function (err, result) {
            done(); 
            res.render("articles/index", {news: result.rows});         
        });

    });
});


app.get("/articles/new", function (req, res) {
	res.render("articles/new.ejs");
});

app.get("/articles/:id", function (req, res) {
	pg.connect(config, function(err, client, done){
        if (err) {
             console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
        }
        client.query("SELECT * FROM articles WHERE id=$1", [req.params.id], function (err, result) {
          done(); 
          console.log(result.rows); 
            if (result.rows.length) {
                res.render("articles/show", {article: result.rows[0]});
            } else {
              // read about this http://expressjs.com/api.html#res.status
            res.status(404).send("News Article Not Found");
            }       
        });
    });
});

app.post("/articles", function (req, res) {
  var newArticle = req.body.article;
  pg.connect(config, function(err, client, done){
    if (err) {
      console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
    }
    client.query("INSERT INTO articles (title, summary) VALUES ($1, $2) RETURNING *", [newArticle.title, newArticle.summary], function (err, result) {
        done(); 
        console.log(result.rows);
        var article = result.rows[0];
        res.redirect("/articles/" + article.id);        
    });

  });
});

app.delete("/articles/:id", function (req, res) {
  var articleId = parseInt(req.params.id);
  var articleIndex = null;
  for (var i = 0, notFound = true; i < articles.length && notFound; i+=1) {
    if (articles[i].id == articleId) {
      notFound = false;
      articleIndex = i;

    }
  }
  if (notFound) {
    res.send(404).send("Article Not Found");
  } else {
    articles.splice(articleIndex, 1);
    res.redirect("/articles");
  }
})

/*
app.delete("/articles/:id", function (req, res) {
	pg.connect(config, function(err, client, done){
        if (err) {
             console.error("Can't Connect to DB!!", err);
        }
        client.query("SELECT * FROM articles WHERE id=$1", [req.params.id], function (err, result) {
          done(); 
          console.log(result.rows);
          // Found article with ID
            if (result.rows.length) {
            	// I want to delete the article & redirect to "/articles"
              client.query("DELETE * FROM articles WHERE id=$1", [req.params.id], function (err, result) )
            } else {
              // read about this http://expressjs.com/api.html#res.status
            res.status(404).send("News Article Not Found");
            }       
        });
    });
});

*/


app.get("/", function (req, res) {
	res.render("site/index.ejs");
});


app.get("/about", function (req, res) {
	res.render("site/about.ejs");
});


app.get("/contact", function (req, res) {
	res.render("site/contact.ejs");
});

app.listen(3000, function () {
  console.log(new Array(51).join("*"));
  console.log("\t LISTENING ON: \n\t\t localhost:3000");
  console.log(new Array(51).join("*"));
});


