/**
 * Dependencies.
 */
var express = require("express"),
  hbs = require("hbs"),
  shell = require("shelljs");

/**
 * Instantiate express app.
 */
var app = express();

/**
 * Configure view engine and auto register partial templates.
 */
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

/**
 * Default stack of middleware.
 */
app.use(express.static('public'));

/**
 * Routes configuration.
 */
app.get("/", function(req, res){
  var games = shell.exec("moonlight list", {silent: true}).output.split("\n").map(function(value){
    return value.split(". ")[1];
  });
  console.log(games[1]);
  res.render("home");
});

app.get("/games", function(req, res){
  res.render("games", {
    games: [1,2,3,4,5,6]
  });
});

/**
 * Start listening for incomming requests.
 */
var server = app.listen(3000, function(){
  console.log('Example app listening at http://%s:%s', server.address().address, server.address().port);
});