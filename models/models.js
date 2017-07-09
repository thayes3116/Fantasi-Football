// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var models = {
	ranking: function(cols, vals, cb) {
		orm.ranking("nfl", cols, vals, function(res) {
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
	}
};	

// Export the database functions for the controller (controller.js).
module.exports = models;