var express = require('express');
var app = module.exports = express();
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var mysql = require("mysql");

var app = express();
var port = process.env.PORT||5000;

var options = {
  port: 3306,
  host: "localhost",
  user: "root", 
  password: "",
  database: "Fantasy",
}

var connection = mysql.createConnection(options);

var sessionStore = new mysqlStore({
  //MySQL store options object
}, connection)
// // // Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

app.listen(port, function() {
  console.log("App listening on PORT " + port);
});	