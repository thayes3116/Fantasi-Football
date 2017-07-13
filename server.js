// dependencies 
// =========================================================
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var path = require("path");

var sessionStore = require('./config/connection')['sessionStore'];
var session = require('./config/connection')['session'];
// console.log(sessionStore);

var app = express();
var port = process.env.PORT||3000;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");


app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

// app.use(function (req, res, next) {
  // var views = req.session.views

//   if (!views) {
//     views = req.session.views = {}
//   }

//   // get the url pathname
//   var pathname = parseurl(req).pathname

//   // count the views
//   views[pathname] = (views[pathname] || 0) + 1

//   next()
// })
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