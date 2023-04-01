// const mysql = require ('mysql');
// var connection = mysql.createConnection({
//   host: "csce-315-db.engr.tamu.edu",
//   database: "csce315331_team_42",
//   user: "csce315331_team_42_master",
//   password: "password",
// });
//
// connection.connect(function(err) {
//   if(err) {
//     console.error("Database connection failed with error " + err.stack);
//     return;
//   }
//   console.log("Connection to database successful");
// })

const { Client } = require('pg');

const client = new Client({
  host: 'csce-315-db.engr.tamu.edu',
  user: 'csce315331_team_42_master',
  database: 'csce315331_team_42',
  password: "password",
});

client.connect(function(err) {
   if(err) {
     console.error("Database connection failed with error " + err.stack);
     return;
   }
   console.log("Connection to database successful");
})

// Use the client to query the database
function getMenuItems() {
  client.query('SELECT menu_item_name FROM Menu', (err, res) => {
    console.log(err ? err.stack : res.rows);
    client.end();
  });
}

//getMenuItems();
