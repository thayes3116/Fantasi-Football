// dependencies 
// =========================================================
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var path = require("path");
var parseurl = require('parseurl')
// var passport = require('passport');
// var flash = require('connect-flash');
// var morgan = require('morgan');
//TODO remove me
// var cookieParser = require('cookie-parser');
var session = require('express-session');


var app = express();
var port = process.env.PORT||3000;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

// pass passport for configuration
// require('./config/passport')(passport)

// set up our express application
// app.use(morgan('dev')); // log every requrest to the console
// app.use(cookieParser()); // read cookies (needed for auth)
// app.use(bodyParser()); // get information from html forms

// required for passport
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(function (req, res, next) {
  var views = req.session.views

  if (!views) {
    views = req.session.views = {}
  }

  // get the url pathname
  var pathname = parseurl(req).pathname

  // count the views
  views[pathname] = (views[pathname] || 0) + 1

  next()
})
// app.use(passport.initialize()); 
// app.use(passport.session()); // login sessions
// app.use(flash()); // use connect-flash for flash messages stroed in session

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars"); // set up handlebars for templating

// Import routes and give the server access to them.
var routes = require("./controllers/controllers.js");

app.use("/", routes);

//listening
app.listen(port, function() {
  console.log("App listening on PORT " + port);
});	