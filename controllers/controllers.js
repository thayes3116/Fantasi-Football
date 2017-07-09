var express = require("express");

var router = express.Router();

// Import the model (models.js) to use its database functions.
var models = require("../models/models.js");

// router.get("/", function(req, res) {
//   res.render("index");
// });

router.get("/ranking", function(req, res) {

	console.log("controllers line 15");

  models.qbRanking(
  	["Category", "Time", "Position"], 
  	["Passing", "2016", "Quarterback"], 
  	function() {
  		res.redirect("/");
  });
});

router.get("/player", function(req, res) {

	console.log("controllers line 28");

  models.player(
  	["Player",], 
  	["Odell Beckham"], 
  	function() {
  		res.redirect("/");
  });
});

router.get("/team", function(req, res) {

	console.log("controllers line 28");

  models.team(
  	["Team",], 
  	['Miami Dolphins'], 
  	function() {
  		res.redirect("/");
  });
});


// Export routes for server.js to use.
module.exports = router;