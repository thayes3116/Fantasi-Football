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
	testFav = "Tom Brady",
	testid = "3",
	teamToSearch = "Miami Dolphins";

router.get("/", function(req, res) {
  
  res.render("index", {layout: "register"});

});

router.post("/login", function(req, res) {
	
	console.log(req.sessionID);
	
	models.loginAs(

		[req.body.emailAddress],
		[req.body.password], 

		function(data) {

			console.log("line 29", data);

			if(data === "Sorry email and password do not match"){


				res.render("login", {layout: "register", data: data})


			}else{

				// sessionStore.set( req.sessionID , {id: data.id});
				
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

				var splitPlayerFavs = favData.favorite_players.split(",")
				var splitTeamFavs = favData.favorite_teams.split(",")
					
				var dataPack = {
					userInfo: favData,
			  		favPlayers: splitPlayerFavs,
			  		favTeams: splitTeamFavs
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
				
				var splitPlayerFavs = favData.favorite_players.split(",")
				var splitTeamFavs = favData.favorite_teams.split(",")
					

			  models.ranking(

			  	["Category", "Position"], 
			  	[rankCategory, positionSearch], 
			  	function(data) {
			      
			  		console.log("data 50", data);
			  		console.log(favData);
			  		var dataPack= {
			  			userInfo: favData,
			  			position: data,
			  			favPlayers: splitPlayerFavs,
			  			favTeams: splitTeamFavs
			  		}

			  		if(data === "Please enter Running Back, Quarterback, or Wide Receiver"){
				  			
				  			res.render("position", dataPack)

				  		}else{
				  			res.render("position", {rank: data}); 			
				  		}
			  });
		});	  
	});		  
});


router.get("/position", function() {

	res.render("position");
})


router.post("/player", function(req, res) {
	
	var savedData = sessionStore.get("userData", function(error,data) {

		if (error) throw error;

		console.log("player post login data", data);

			models.displayUser(data.id, function(modelData) {
				favData = modelData[0];
				
				var splitPlayerFavs = favData.favorite_players.split(",")
				var splitTeamFavs = favData.favorite_teams.split(",")
						
			  models.player(
			  	["Player",], 
			  	[req.body.playerSearch], 
			  	function(data) {

			  		var dataPack= {
			  			userInfo: favData,
			  			player: data,
			  			favPlayers: splitPlayerFavs,
			  			favTeams: splitTeamFavs
			  		}
			  		
			        if(data === "sorry player not found"){
				  			res.render("player", dataPack)
				  		}else{

				  			res.render("player", dataPack);
				  		}

			  });
			});	
		});		
	});  	



router.post("/addPlayer", function(req,res){

	console.log('Controller 155');

	models.addPlayer(
		["favorite_players", "id"],
		[testFav, testid],
		function(data){
			console.log(data);
		});
});

router.post("/addTeam", function(req,res){

	models.addTeam(
		["favorite_teams", "id"],
		[testFav, testid],
		function(data){
			console.log(data);
		});
});

router.post("/team", function(req, res) {

	var savedData = sessionStore.get("userData", function(error,data) {

		if (error) throw error;

		console.log("player post login data", data);

			models.displayUser(data.id, function(modelData) {

				favData = modelData[0];

				var splitPlayerFavs = favData.favorite_players.split(",")
				var splitTeamFavs = favData.favorite_teams.split(",")
				
			  models.team(
			  	["Team",], 
			  	[req.body.teamSearch], 
			  	function(data) {

			  		var dataPack= {
			  			userInfo: favData,
			  			team: data,
			  			favPlayers: splitPlayerFavs,
			  			favTeams: splitTeamFavs
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
		function(data) {

			console.log(data);

			if(data == "Email already exists"){

				res.render("signup", {layout: "register", data: data})

			}else{

				res.redirect("/login");
			}
		});	
});

router.get("/signup", function(req, res) {

	res.render("signup", {layout: "register"});

});

// Export routes for server.js to use.
module.exports = router;