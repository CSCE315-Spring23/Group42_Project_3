const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const uuid = require('uuid').v4;
// Set up server
const app = express();
app.use(express.json());
app.use(express.static('.'));

app.use(cors({
  origin: 'http://localhost:3000'
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
app.get('/menuRequest/:start/:end', async (req, res) => {
  try {
    const start = parseInt(req.params.start);
    const end = parseInt(req.params.end);
    //console.log("attempting fetch, start: ", start, ", end: ", end);
    const userId = req.params.id;
    const { rows } = await pool.query(`SELECT * FROM Menu WHERE MENU_ITEM_ID >= $1 AND MENU_ITEM_ID <= $2 ORDER BY MENU_ITEM_ID`, [start, end]);
    res.json(rows);
    //console.log(rows);
  } catch (err) {
    //console.log("error!");
    console.error("Read failed with error " +err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//this function is for getting all items from the menu rather than a start and end
app.get('/menuRequest2', async () => {
  try {
    // const start = parseInt(req.params.start);
    // const end = parseInt(req.params.end);
    //console.log("attempting fetch");
    // const userId = req.params.id;
    const { rows } = await pool.query(`SELECT * FROM Menu ORDER BY MENU_ITEM_ID`);
    res.json(rows);
    //console.log(rows);
  } catch (err) {
    //console.log("error!");
    console.error("Read failed with error " +err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/getInventoryItemsForMenu/:start/:end', async (req, res) => {
  try {
    const inventoryItems = [];
    const start = parseInt(req.params.start);
    const end = parseInt(req.params.end);
    for (let i = start; i <= end; i++) {
      //console.log("item :" + i);
      const recipeItemsQuery = `SELECT inventory_id FROM Recipe_Item WHERE menu_id = ${i}`;
      const recipeItemsResult = await pool.query(recipeItemsQuery);
      const inventoryIds = recipeItemsResult.rows.map((item) => parseInt(item.inventory_id));
      //console.log(inventoryIds);
      const inventoryItemsQuery = `SELECT * FROM inventory_item WHERE inventory_id IN (${inventoryIds.join(",")})`;
      const inventoryItemsResult = await pool.query(inventoryItemsQuery);
      const inventoryItemsForMenu = inventoryItemsResult.rows.map((item) => item.inventory_item_name);
      inventoryItems.push(inventoryItemsForMenu);
      //console.log("item :" + i);
      //console.log(inventoryItemsForMenu);
      inventoryIds.length = 0;
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
