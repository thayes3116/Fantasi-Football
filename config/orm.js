// Import MySQL connection.
var connection = require("../config/connection.js")['connection'];

// Helper function for SQL syntax.
// function printQuestionMarks(num) {
//   var arr = [];

//   for (var i = 0; i < num; i++) {
//     arr.push("?");
//   }

//   return arr.toString();
// }

// // Helper function for SQL syntax.
// function objToSql(ob) {
//   var arr = [];

//   for (var key in ob) {
//     if (Object.hasOwnProperty.call(ob, key)) {
//       arr.push(key + "=" + ob[key]);
//     }
//   }

//   return arr.toString();
// }

var orm = {

  ranking: function(table, cols, vals, cb) {
    
    var queryString = "SELECT `Rank`, `Player`, `Team` FROM " + table;

    queryString += " WHERE ";   
    for( var i = 0; i < cols.length; i++){
      queryString += cols[i] + " = " + "\"" + vals[i] + "\"" + " AND "
    }
    queryString += "`Season Type` = 'Regular Season' AND `Time` = 2016 AND `Rank` < 11 ORDER BY `Rank` ASC;";
    
    console.log(queryString); 

    connection.query(queryString, function(err, result) {

       if (err) throw err;
          
          try{

            if(!result[0]) {
            
              throw new Error("Please enter Running Back, Quarterback, or Wide Receiver");
            
            }else {

              cb(result);

            }

          }catch(ex){

            console.log(ex.message);
            cb(ex.message);
          } 
    });
  },

  player: function(table, cols, vals, cb) {

    var positionString = "SELECT `Position` FROM " + table + " WHERE " + cols[0] + " = " + "\"" + vals[0] + "\" LIMIT 1;"

    connection.query(positionString, function(err, result) {

      if (err) throw err;

      try{

        if(!result[0]) {
        
          throw new Error("sorry player not found");
        
        }else {
         
          console.log(result[0].Position);
        
          if(result[0].Position === "Quarterback"){
            var category = "Passing";      
            var queryString = "SELECT `Player`, `Team`, `Position`, `Rank`, `Touch Downs` AS TD, `Passer_Rating` AS PasserRating, `Yards_Per_Game_Average` AS YPG, `Interception`, `Time` FROM " + table;

          }else if(result[0].Position === "Running Back"){
            var category = "Rushing";
            var queryString = "SELECT `Player`, `Team`, `Position`, `Rank`,`Touch Downs` AS TD, `Yards_Per_Game_Average` AS YPG, `Attempts_Per_Game` AS RushAttempts, `Average_Yards` AS AvgYards, `Time` FROM " + table;
           
          }else if(result[0].Position === "Wide Receiver"){
            var category = "Receiving";
            var queryString = "SELECT `Player`, `Team`, `Position`, `Rank`, `Touch Downs` AS TD, `Yards`, `Yards_Per_Game_Average` AS YPG, `Receptions`, `Time` FROM " + table;
          }

          queryString += " WHERE ";   
          for( var i = 0; i < cols.length; i++){
            queryString += cols[i] + " = " + "\"" + vals[i] + "\"" + " AND "
          }

          queryString += "`Category` = " + "\"" + category + "\"" + " AND `Season Type` = 'Regular Season' ORDER BY Time ASC";
          
          console.log(queryString); 

          connection.query(queryString, function(err, result) {

            if (err) throw err;

            cb(result);
        
          }); 
        } 

      }catch(ex){
        console.log(ex.message);
        cb(ex.message);
      }
    });    
  },
  team: function(table, cols, vals, cb) {


      var queryString = "SELECT `Team`, `Time`, sum(`Touch Downs`) AS TD, sum(`Total_Points_Game_Average`) AS PPG, sum(`Sacked`) AS Sacked, sum(`Fumbles_Total`) AS Fumbles, sum(`Interception`) AS Interceptions FROM " + table;

      queryString += " WHERE " + cols[0] + " = " + "\"" + vals[0] + "\"";   
      

      queryString += " AND `Season Type` = 'Regular Season' GROUP BY `TIME` DESC;";

      
      console.log(queryString);    

      connection.query(queryString, function(err, result) {


        if (err) throw err;
          
          try{

            if(!result[0]) {
            
              throw new Error("sorry team not found");
            
            }else {

              cb(result);

            }

          }catch(ex){

            console.log(ex.message);
            cb(ex.message);
          }  
        
      })    

  },
  
  createUser: function(table, valName, valEmail, valPassword, cb) {

    var queryString = "INSERT INTO " + table;

    queryString += " (name, email_address, password) VALUES ('" + valName + "',";
    
    queryString += " '"  + valEmail + "', '" + valPassword + "')";

    console.log(queryString);

    connection.query(queryString, function(err, result) {

      if (err) throw err;
      
      console.log("created new user");
      cb(result);
    })
  },

  loginAs: function(table, valEmail, valPassword, cb) {

    var queryString = "SELECT id, name, favorite_players, favorite_teams FROM " + table;

    queryString += " WHERE email_address = '" + valEmail + "'";

    queryString +=  " AND password = '" + valPassword + "'";

    console.log(queryString);

    connection.query(queryString, function(err, result) {

      if (err) throw err;
      
      if(!result[0]) {
        
        console.log("sorry email and password does not match");
     
      } else {
 
        console.log(result[0]);
        cb(result[0]);
      }
      
    })
  },

  displayUser: function(table, id, cb) {

    var queryString = "SELECT * FROM " + table;

    queryString += " WHERE id = " + id;

    console.log(queryString);

    connection.query(queryString, function(err, result) {

      if (err) throw err;

      console.log(result);
       cb(result);
    })
    
  }
}

// Export the orm object for the model (models.js).
module.exports = orm;