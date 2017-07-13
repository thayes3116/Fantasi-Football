// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var models = {

	ranking: function(cols, vals, year, cb) {
		orm.ranking("nfl", cols, vals, year, function(res) {

			cb(res);
		});
	},

	addPlayer: function(cols, vals, cb) {
		orm.addPlayer("user", cols, vals, function(res) {
			cb(res);
		});
	},

	addTeam: function(cols, vals, cb) {
		orm.addTeam("user", cols, vals, function(res) {
			cb(res);
		});
	},
	
	player: function(cols, vals,cb) {
		orm.player("nfl", cols, vals, function(res) {
			cb(res);
		});
	},

	team: function(cols, vals, cb) {
		orm.team("nfl", cols, vals, function(res) {
			cb(res);
		});
	},

	createUser: function(valName, valEmail, valPassword, cb) {
		orm.createUser("user", valName, valEmail, valPassword, function(res) {
			cb(res);
		})
	},

	loginAs: function(valEmail, valPassword, cb) {
		orm.loginAs("user", valEmail, valPassword, function(res) {
			cb(res);
		})
	},

	displayUser: function(id, cb) {
		orm.displayUser("user", id, function(res) {
			cb(res);
		})
	}
};	

// Export the database functions for the controller (controller.js).
module.exports = models;