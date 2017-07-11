var express = require("express");

var router = express.Router();
var sessionStore = require("../config/connection.js")['sessionStore'];
// Import the model (models.js) to use its database functions.
var models = require("../models/models.js");

var rankPosition = "Quarterback",
	rankYear = "2016",
	rankCategory,
	playerToSearch = "Tom Brady",
	teamToSearch = "Miami Dolphins";

if(rankPosition === "Quarterback"){
	rankCategory = "Passing";
}else if(rankPosition === "Running Back"){
	rankCategory = "Rushing";
}else if(rankPosition === "Wide Receiver"){
	rankCategory = "Receiving";
}

router.get("/", function(req, res) {
  
  res.render("index", {layout: "register"});

});

router.get("/profile", function(req, res) {
	
	var savedData = sessionStore.get("userData", function(error,data) {
		if (error) throw error;
		console.log("line 33", data);	
		try{
			models.displayUser(data.id, function(modelData) {
				console.log('modelData', modelData[0]);
				res.render("profile", modelData[0]);	
			});
		}catch (err) {
			console.error("40", err.message);
			// res.render("Player not found. Please enter a valid player")			
		}	
	});
		
})

router.post("/ranking", function(req, res) {

	console.log("controllers line 27");

  models.ranking(

  	["Category", "Position"], 
  	[rankCategory, rankPosition], 

  	function(data) {

  		console.log("Controller line 66" , data);

	  		if(data === "Please enter Running Back, Quarterback, or Wide Receiver"){
	  			
	  			res.render("profile", {Player:data})

	  		}else{

	  			res.render("profile", {ranking:data}); 			
	  		}
  });
});

router.post("/player", function(req, res) {

	console.log("controllers line 60");

		models.player(
	  	["Player",], 
	  	[playerToSearch], 
	  	function(data) {
	  		console.log("Controller line 66" + data);
	  		if(data === "sorry player not found"){
	  			res.render("profile", {Player:data})
	  		}else{
	  			res.render("profile", data);
	  		}
	  		
	  });	  
});

router.post("/team", function(req, res) {

	console.log("controllers line 78");

  models.team(
  	["Team",], 
  	[teamToSearch], 
  	function(data) {
  		console.log(data);
  		if(data === "sorry team not found"){
	  			res.render("profile", {Player:data})
	  		}else{
	  			res.render("profile", data);
	  		}
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

	models.loginAs(
		[req.body.emailAddress],
		[req.body.password], 

		function(data) {
			console.log("line 122", data);
			sessionStore.set("userData",{id: data.id});
			res.redirect("/profile");
		});	
});

// Export routes for server.js to use.
module.exports = router;