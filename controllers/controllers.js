var express = require("express");

var router = express.Router();
var sessionStore = require("../config/connection.js")['sessionStore'];
// Import the model (models.js) to use its database functions.
var models = require("../models/models.js");

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

router.get("/", function(req, res) {
  
  res.render("index", {layout: "register"});

});


router.get("/profile", function(req, res) {
	// var id = req.params.id;
	var savedData = sessionStore.get("userData", function(error,data) {
		if (error) throw error;
		console.log("line 33", data);	
		models.displayUser(data.id, function(modelData) {
			console.log('modelData', modelData[0]);
			res.render("profile", modelData[0]);	
		});
	});
		
})

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

router.get("/login", function(req, res) {

	res.render("login", {layout: "register"});
});

router.post("/signup", function(req, res) {

	models.createUser(
		[req.body.name],
		[req.body.emailAddress],
		[req.body.password],
		function() {

			// console.log("data");
			res.redirect("/login");
		});

	
});

router.get("/signup", function(req, res) {

	res.render("signup", {layout: "register"});

});

router.post("/login", function(req, res) {
	// console.log(req.body.emailAddress + " controller line 112 " + req.body.password);
	// var id  = req.params.id;

	models.loginAs(
		[req.body.emailAddress],
		[req.body.password], 

		function(data) {
 
			console.log("data", data);

			console.log("line 122", data);
			sessionStore.set("userData",{id: data.id});
			// localStorage.setItem(data.id, data);
			// res.end();
			 res.redirect("/profile");
		});

	
});


// Export routes for server.js to use.
module.exports = router;