var express = require("express");

var router = express.Router();

var sessionStore = require("../config/connection.js")['sessionStore'];

// Import the model (models.js) to use its database functions.
var models = require("../models/models.js");
var favData;
var rankPosition = "Quarterback",
	rankYear = "2016",
	rankCategory,
	playerToSearch = "Tom Brady",
	teamToSearch = "Miami Dolphins";

router.get("/", function(req, res) {
  
  res.render("index", {layout: "register"});

});

router.post("/login", function(req, res) {
	console.log(req.session);
	
	models.loginAs(
		[req.body.emailAddress],
		[req.body.password], 

		function(data) {

			console.log("line 29", data);

			if(data === "Sorry email and password do not match"){

				res.redirect("login"{data: data})

			}else{

				sessionStore.set("userData",{id: data.id});
				
				res.redirect("/profile");
			}

		});	
});

router.get("/profile", function(req, res) {
	
	var savedData = sessionStore.get("userData", function(error,data) {

		if (error) throw error;

		console.log("line 51", data);

			models.displayUser(data.id, function(modelData) {

				favData = modelData[0];
				var dataPack = {
					userInfo: favData
				}
				console.log(dataPack);
				res.render("profile", dataPack);					
			});		
	});		
})


router.post("/position", function(req, res) {

	var positionSearch = req.body.positionSearch;

	console.log(positionSearch);
		if(positionSearch === "Quarterback"){
		rankCategory = "Passing";
		}else if(positionSearch === "Running Back"){
			rankCategory = "Rushing";
		}else if(positionSearch === "Wide Receiver"){
			rankCategory = "Receiving";
		}

	var savedData = sessionStore.get("userData", function(error,data) {

		if (error) throw error;

		console.log("player post login data", data);

			models.displayUser(data.id, function(modelData) {
				
				favData = modelData[0];
				//console.log('favData', favData);

			  models.ranking(

			  	["Category", "Position"], 
			  	[rankCategory, positionSearch], 
			  	function(data) {
			      
			  		console.log("data 50", data);
			  		console.log(favData);
			  		var dataPack= {
			  			userInfo: favData,
			  			position: data
			  		}
			  		if(data === "Please enter Running Back, Quarterback, or Wide Receiver"){
				  			
				  			res.render("profile", dataPack)

				  		}else{
				  			res.render("profile", dataPack); 			
				  		}
			  });
		});	  
	});		  
});

router.post("/player", function(req, res) {
	
	var savedData = sessionStore.get("userData", function(error,data) {

		if (error) throw error;

		console.log("player post login data", data);

			models.displayUser(data.id, function(modelData) {
				favData = modelData[0];
				console.log('favData', favData);
				// res.render("profile", modelData[0]);
					
			  models.player(
			  	["Player",], 
			  	[req.body.playerSearch], 
			  	function(data) {
			  		// console.log('favData', favData);
			  		// console.log(data);
			  		var dataPack= {
			  			userInfo: favData,
			  			player: data
			  		}
			  		console.log(dataPack);
			        if(data === "sorry player not found"){
				  			res.render("player", dataPack)
				  		}else{

				  			res.render("player", dataPack);
				  		}
			  		

			  });
			});	
		});		
	});  	

router.post("/team", function(req, res) {

	var savedData = sessionStore.get("userData", function(error,data) {

		if (error) throw error;

		console.log("player post login data", data);

			models.displayUser(data.id, function(modelData) {

				favData = modelData[0];
				console.log('favData', favData);


			  models.team(
			  	["Team",], 
			  	[req.body.teamSearch], 
			  	function(data) {

			  		console.log(favData);
			  		console.log(data);

			  		var dataPack= {
			  			userInfo: favData,
			  			team: data
			  		}

			  		if(data === "sorry team not found"){

				  			res.render("team", dataPack)
				  		}else{
				  			res.render("team", dataPack);
				  		}
				});
		});		 
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

// Export routes for server.js to use.
module.exports = router;