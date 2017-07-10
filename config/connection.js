// // Set up MySQL connection.
var mysql = require("mysql");
var session = require('express-session');
var mysqlStore = require('express-mysql-session')(session);


var options = {
  port: 3306,
  host: "localhost",
  user: "root", 
  password: "root",
  database: "Fantasy",
}

var connection = mysql.createConnection(options);
var sessionStore = new mysqlStore({}, connection)
// // // Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// // // Export connection for our ORM to use.
module.exports = {
  connection: connection,
  sessionStore: sessionStore
};

