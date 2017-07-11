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


router.post("/position", function(req, res) {
	var positionSearch =req.body.positionSearch;
	console.log(positionSearch);
	if(positionSearch === "Quarterback"){
	rankCategory = "Passing";
}else if(positionSearch === "Running Back"){
	rankCategory = "Rushing";
}else if(positionSearch === "Wide Receiver"){
	rankCategory = "Receiving";
}
	console.log("controllers line 27");

  models.ranking(
  	["Category", "Position"], 
  	[rankCategory, positionSearch], 
  	function(data) {
      
  		console.log("data 50", data);
  		if(data === "Please enter Running Back, Quarterback, or Wide Receiver"){
	  			
	  			res.render("profile", {Player:data})

	  		}else{

	  			res.render("profile", {rank:data}); 			
	  		}
  });
});

router.post("/player", function(req, res) {

  models.player(
  	["Player",], 
  	[req.body.playerSearch], 
  	function(data) {
        if(data === "sorry player not found"){
	  			res.render("player", {Player:data})
	  		}else{
	  			res.render("player", {player: data});
	  		}
  		console.log("data 63", data);

  });
});	  	

router.post("/team", function(req, res) {

	console.log("controllers line 78");

  models.team(
  	["Team",], 
  	[req.body.teamSearch], 
  	function(data) {
  		console.log(data);
  		if(data === "sorry team not found"){
	  			res.render("team", {Player:data})
	  		}else{
	  			res.render("team", {team: data});
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