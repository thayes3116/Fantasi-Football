Select * FROM `nfl` WHERE `Category` = "Passing" AND `Position` = "Quarterback" AND `Time` = "2016" AND `Season Type` = "Regular Season" AND `Rank` < 40 ORDER BY `Rank` ASC;

SELECT `Player`, `Team`, `Position`, `Rank`, `Touch Downs`,`Yards_Per_Game_Average`,`Attempts_Per_Game`, `Average_Yards`, `Time` FROM `nfl` WHERE `Player` = 'Jay Ajayi' AND `Season Type` = 'Regular Season' AND `Category` = 'Rushing'; 

SELECT `Player`, `Team`, `Position`, `Rank`, `Touch Downs`, `Passer_Rating`, `Yards_Per_Game_Average`, `Interception`, `Time` FROM `nfl` WHERE `Player` = "Ryan Tannehill" AND `Season Type` = 'Regular Season' AND `Category` = "Passing";

SELECT `Player`, `Team`, `Position`, `Rank`, `Touch Downs`, `Yards`, `Yards_Per_Game_Average`, `Receptions`, `Time` FROM `nfl` WHERE `Player` = "Odell Beckham" AND `Season Type` = 'Regular Season' AND `Category` = 'Receiving';
SELECT `Team`, sum(`Touch Downs`), sum(`Total_Points_Game_Average`), sum(`Sacked`), sum(`Fumbles_Total`), sum(`Interception`) Time = 2016 FROM `nfl` Where `Team` = 'Miami Dolphins' AND `Season Type` = 'Regular Season';