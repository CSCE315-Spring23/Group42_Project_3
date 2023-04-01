const { Client } = require('pg');

const client = new Client({
  host: 'csce-315-db.engr.tamu.edu',
  user: 'csce315331_team_42_master',
  database: 'csce315331_team_42',
  password: "password",
});

client.connect(function(err) {
    if (err) {
      console.error("Database connection failed with error " + err.stack);
      return;
    }
    console.log("Connection to database successful");
});

// function test() {
//   return "hiii";
// }

module.exports = client;

// Use the client to query the database
// export function getMenuItems() {
//   //client.query('SELECT menu_item_name FROM Menu', (err, res) => {
//     //console.log(err ? err.stack : res.rows);
//     //client.end();
//   //});
//   console.log("test");
//   return "hi";
// }


//export default getMenuItems;
