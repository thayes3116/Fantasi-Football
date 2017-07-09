// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax.
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function for SQL syntax.
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    if (Object.hasOwnProperty.call(ob, key)) {
      arr.push(key + "=" + ob[key]);
    }
  }

  return arr.toString();
}

var orm = {
  ranking: function(table, cols, vals, cb) {
    var queryString = "SELECT * FROM " + table;

    queryString += " WHERE ";   
    for( var i = 0; i < cols.length; i++){
      queryString += cols[i] + " = " + "\"" + vals[i] + "\"" + " AND "
    }
    queryString += "`Rank` < 20 ORDER BY `Rank` ASC;";
    
    console.log(queryString);    
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  player: function(table, cols, vals, cb) {

    var positionString = "SELECT `Position` FROM " + table + " WHERE " + cols[0] + " = " + "\"" + vals[0] + "\" LIMIT 1;"

    connection.query(positionString, function(err, result) {
        if (err) {
          throw err;
        }
        console.log(result[0].Position);
    
      if(result[0].Position === "Quarterback"){      
        var queryString = "SELECT `Player`, `Team`, `Position`, `Rank`, `Touch Downs`, `Passer_Rating`, `Yards_Per_Game_Average`, `Interception`, `Time` FROM " + table;

      }else if(result[0].Position === "Running Back"){
        var queryString = "SELECT `Player`, `Team`, `Position`, `Rank`,`Touch Downs`, `Yards_Per_Game_Average`,     `Attempts_Per_Game`, `Average_Yards`, `Time` FROM " + table;
       
      }else if(result[0].Position === "Wide Receiver"){
        var queryString = "SELECT `Player`, `Team`, `Position`, `Rank`, `Touch Downs`, `Yards`, `Yards_Per_Game_Average`, `Receptions`, `Time` FROM " + table;
      }

        queryString += " WHERE ";   
        for( var i = 0; i < cols.length; i++){
          queryString += cols[i] + " = " + "\"" + vals[i] + "\"" + " AND "
        }
        queryString += "`Season Type` = 'Regular Season'";
        
        console.log(queryString);    
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
          cb(result);
        });     
    });    
  },
  team: function(table, cols, vals, cb) {
    var queryString = "SELECT `Team`, sum(`Touch Downs`), sum(`Total_Points_Game_Average`), sum(`Sacked`), sum(`Fumbles_Total`), sum(`Interception`) FROM " + table;

    queryString += " WHERE " + cols[0] + " = " + "\"" + vals[0] + "\"";   
    
    queryString += " AND `Season Type` = 'Regular Season'";
    
    console.log(queryString);    
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
}

// Export the orm object for the model (models.js).
module.exports = orm;