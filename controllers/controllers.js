var express = require("express");

var router = express.Router();

// Import the model (models.js) to use its database functions.
var models = require("../models/models.js");

console.log(models.connected);

router.get("/", function(req, res) {
  res.render("index");
});

// router.post("/", function(req, res) {
//   model.logIn(function(data) {
//   });
// });

// router.get("/", function(req, res) {
//   model.logIn(function(data) {
//   });
// });

// router.get("/", function(req, res) {
//   model.logIn(function(data) {
//   });
// });

// router.get("/", function(req, res) {
//   model.logIn(function(data) {
//   });
// });

// Export routes for server.js to use.
module.exports = router;