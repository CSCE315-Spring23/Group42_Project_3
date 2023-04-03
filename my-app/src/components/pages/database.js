const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

// Set up server
const app = express();
app.use(express.json());
app.use(express.static('.'));

app.use(cors({
  origin: 'http://localhost:3000' // replace with your own domain or '*' to allow all domains
}));

console.log("db document running");

// Connect to PostgreSQL database
const pool = new Pool({
  host: 'csce-315-db.engr.tamu.edu',
  user: 'csce315331_team_42_master',
  database: 'csce315331_team_42',
  password: "password",
});
pool.connect((err, client, done) => {
  if (err) {
       console.error("Database connection failed with error " + err.stack);
       return;
     }
     console.log("Connection to database successful");
});

// Define an endpoint that returns data from the 'users' table
app.get('/burgerRequest', async (req, res) => {
  try {
    console.log("attempting fetch");
    //const userId = req.params.id;
    const { rows } = await pool.query('SELECT * FROM Menu  WHERE MENU_ITEM_ID < 5');
    res.json(rows);
    console.log(rows);
  } catch (err) {
    console.log("error!");
    console.error("Read failed with error " +err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
