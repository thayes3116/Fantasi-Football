// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var models = {
	connected: orm.connected    	  
}

// Export the database functions for the controller (catsController.js).
module.exports = models;