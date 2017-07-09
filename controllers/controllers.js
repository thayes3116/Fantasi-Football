var express = require("express");

var router = express.Router();

// Import the model (models.js) to use its database functions.
var models = require("../models/models.js");

// router.get("/", function(req, res) {
//   res.render("index");
// });
var rankPosition = "Quarterback",
	rankYear = "2016",
	rankCategory,
	playerToSearch = "Odell Beckham",
	teamToSearch = "Miami Dolphins";

if(rankPosition === "Quarterback"){
	rankCategory = "Passing";
}else if(rankPosition === "Runnning Back"){
	rankCategory = "Rushing";
}else if(rankPosition === "Wide Receiver"){
	rankCategory = "Receiving";
}

router.get("/ranking", function(req, res) {

	console.log("controllers line 27");

  models.ranking(
  	["Category", "Time", "Position"], 
  	[rankCategory, rankYear, rankPosition], 
  	function() {
  		res.redirect("/");
  });
});

router.get("/player", function(req, res) {

	console.log("controllers line 39");

  models.player(
  	["Player",], 
  	[playerToSearch], 
  	function() {
  		res.redirect("/");
  });
});

router.get("/team", function(req, res) {

	console.log("controllers line 51");

  models.team(
  	["Team",], 
  	[teamToSearch], 
  	function() {
  		res.redirect("/");
  });
});


// Export routes for server.js to use.
module.exports = router;