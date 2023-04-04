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
    //console.log("attempting fetch");
    const userId = req.params.id;
    const { rows } = await pool.query(`SELECT * FROM Menu WHERE MENU_ITEM_ID < 5 ORDER BY MENU_ITEM_ID`);
    res.json(rows);
    //console.log(rows);
  } catch (err) {
    //console.log("error!");
    console.error("Read failed with error " +err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/getInventoryItemsForMenu', async (req, res) => {
  try {
    const inventoryItems = [];
    for (let i = 1; i <= 4; i++) {
      const recipeItemsQuery = `SELECT inventory_id FROM Recipe_Item WHERE menu_id = ${i}`;
      const recipeItemsResult = await pool.query(recipeItemsQuery);
      const inventoryIds = recipeItemsResult.rows.map((item) => item.inventory_id);
      const inventoryItemsQuery = `SELECT * FROM inventory_item WHERE inventory_id IN (${inventoryIds.join(",")})`;
      const inventoryItemsResult = await pool.query(inventoryItemsQuery);
      const inventoryItemsForMenu = inventoryItemsResult.rows.map((item) => item.inventory_item_name);
      inventoryItems.push(inventoryItemsForMenu);
    }
    res.json(inventoryItems);
    console.log(inventoryItems);
  } catch (err) {
    console.error("Read failed with error " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
