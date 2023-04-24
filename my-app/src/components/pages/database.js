const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const uuid = require('uuid').v4;
const path = require('path');
const { copyFileSync } = require('fs');
// const { GetInventoryList } = require('./databaseFunctions');
// Set up server
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../../public')));


const allowedOrigins = ['https://revs-american-grill-z267.onrender.com/', 'http://localhost:3000']
app.use(cors({
  origin: allowedOrigins
}));


//app.options('*', cors());

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

    var queryToUse;
    if((start === 0) && (end === 0)){
      queryToUse = 'SELECT * FROM Menu ORDER BY MENU_ITEM_ID';
    }
    else{
      queryToUse = 'SELECT * FROM Menu WHERE MENU_ITEM_ID >= ' + start + ' AND MENU_ITEM_ID <= ' + end + ' ORDER BY MENU_ITEM_ID';
    }
    console.log(queryToUse);
    const { rows } = await pool.query(queryToUse);
    res.json(rows);
    //console.log(rows);
  } catch (err) {
    //console.log("error!");
    console.error("Read failed with error in menuRequest: " +err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Fetch Inventory items from database where start and end represent inventory IDs
app.get('/inventoryRequest/:start/:end', async (req, res) => {
  try {
    const start = parseInt(req.params.start);
    const end = parseInt(req.params.end);

    var queryToUse;
    if((start === 0) && (end === 0)){
      queryToUse = 'SELECT * FROM inventory_item ORDER BY inventory_id';
    }
    else{
      queryToUse = 'SELECT * FROM inventory_item WHERE inventory_id >= ' + start + ' AND inventory_id <= ' + end + ' ORDER BY inventory_id';
    }
    console.log(queryToUse);
    const { rows } = await pool.query(queryToUse);
    res.json(rows);
    //console.log(rows);

  } catch (err) {
    //console.log("error!");
    console.error("Read failed with error in inventoryRequest: " +err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Fetch orders from database where start and end are dates
app.get('/orderRequest', async (req, res) => {
  try {
    var queryToUse;
    queryToUse = 'SELECT * FROM orders ORDER BY order_id LIMIT 20';
    console.log(queryToUse);
    const { rows } = await pool.query(queryToUse);
    res.json(rows);
    //console.table(rows);

  } catch (err) {
    //console.log("error!");
    console.error("Read failed with error in inventoryRequest: " +err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Fetch list of recipes on the menu
app.get('/recipeRequest', async (req, res) => {
  try {
    var queryToUse;
    queryToUse = 'SELECT * FROM recipe_item ORDER BY recipe_id';
    console.log(queryToUse);
    const { rows } = await pool.query(queryToUse);
    res.json(rows);
    //console.log(rows);

  } catch (err) {
    console.error("Read failed with error in inventoryRequest: " +err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Fetch the whole menu list order by their id
app.get('/menuListRequest', async (req, res) => {
  try {
    var queryToUse;
    queryToUse = 'SELECT menu_item_id, menu_item_name, menu_item_cost FROM menu ORDER BY menu_item_id';
    console.log(queryToUse);
    const { rows } = await pool.query(queryToUse);
    res.json(rows);
    //console.log(rows);

  } catch (err) {
    console.error("Read failed with error in inventoryRequest: " +err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Fetch Restock Report which are Inventory items from database that need to be restock
app.get('/restockRequest', async (req, res) => {
  try {
    var queryToUse;
    queryToUse = 'SELECT * FROM inventory_item WHERE inventory_item_quantity <= 50';
    console.log(queryToUse);
    const { rows } = await pool.query(queryToUse);
    res.json(rows);
    //console.log(rows);

  } catch (err) {
    console.error("Read failed with error in inventoryRequest: " +err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// app.get('/menuRequest/:name', async (req, res) => {
//   try {
//     const name = req.params.name;
//     console.log("Name: " + name);
//     const { rows } = await pool.query('SELECT * FROM Menu WHERE MENU_ITEM_NAME = $1', [name]);
//     //console.log(rows);
//     res.json(rows);
//   } catch (err) {
//     //console.log("error!");
//     console.error("Read failed with error " +err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

//this function is for getting all items from the menu rather than a start and end
// app.get('/menuRequestAll', async (req, res) => {
//   try {
//     // const start = parseInt(req.params.start);
//     // const end = parseInt(req.params.end);
//     //console.log("attempting fetch");
//     // const userId = req.params.id;
//     const { rows } = await pool.query(`SELECT * FROM Menu ORDER BY MENU_ITEM_ID`);
//     res.json(rows);
//     //console.log(rows);
//   } catch (err) {
//     //console.log("error!");
//     console.error("Read failed with error " +err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

app.get('/getInventoryItemsForMenu/:start/:end', async (req, res) => {
  try {
    const inventoryItems = [];
    const start = parseInt(req.params.start);
    var end = parseInt(req.params.end);
    if((start === 0) && (end === 0)){
      start = 1;
        const sizeOfMenuQuery = `SELECT MAX(menu_item_id) FROM menu`;
        const sizeOfMenuResult = await pool.query(sizeOfMenuQuery);
        end = sizeOfMenuResult.rows.map((item) => parseInt(item.menu_item_id));
    }

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
    //console.log(inventoryItems);
  } catch (err) {
    console.error("Read failed with error in getInventoryItemsForMenu: " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//check if we already have a row for our session
app.get('/checkSession/:id', async (req, res) => {
  try {
    const myID = req.params.id;
    //console.log("ID:" + myID);

    const result = await pool.query('SELECT * FROM cart WHERE sessionid = $1', [myID]);

    if (result.rowCount === 0) {
    await pool.query('INSERT INTO cart (sessionid) VALUES ($1)', [myID]);
    res.status(200).json({ message: 'Session ID added to cart.' });
  } else {
    res.status(200).json({ message: 'Session ID already exists in cart.' });
  }
  } catch (err) {
    console.error('Error checking session ID:', err);
    res.status(500).json({message:'Internal server error.'});
  }
});

app.get('/endSession/:id', async (req, res) => {
  try {
    const myID = req.params.id;

    const result = await pool.query('SELECT * FROM cart WHERE sessionid = $1', [myID]);

    if (result.rowCount === 0) {
      res.status(200).json({message:'Session ID does not exist in cart.'});
      //console.log("doesnt exist to delete!");
    } else {
      await pool.query('DELETE FROM cart WHERE sessionid = $1', [myID]);
      res.status(200).json({message: 'Session ID removed from cart.'});
      //console.log("deleted!");
    }
  } catch (err) {
    console.error('Error checking session ID:', err);
    res.status(500).json({message:'Internal server error.'});
  }
});

app.post('/addToCart/:id', async (req, res) => {
  try {
    const myID = req.params.id;
    const item = req.body;
    //console.log(item);
    const result = await pool.query('SELECT * FROM cart WHERE sessionid = $1', [myID]);

    if (result.rowCount === 0) {
      res.status(500).json({ message: 'User session not found!' });
    } else {
      const cartItem = result.rows[0];
      const currentCart = cartItem.orderlist || []; //init to empty if nothing there
      //console.log("Current:" + currentCart);
      currentCart.push(item);
      const updateResult = await pool.query('UPDATE cart SET orderlist = $1 WHERE sessionid = $2', [currentCart, myID]);
      //console.log("Updated:" + JSON.stringify(updateResult));
      //console.log(item);
      res.status(200).json({ message: 'Added to cart!' });
    }
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.get('/getCart/:id', async (req, res) => {
  try {
    const myID = req.params.id;
    const result = await pool.query('SELECT * FROM cart WHERE sessionid = $1', [myID]);
    res.json(result);
  } catch (err) {
    console.error("Read failed with error in getCart " +err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/createOrder/:menuItems/:ingredientList/:cost', async (req, res) => {
  try {
    const menuItems = req.params.menuItems; 
    const ingredientList = req.params.ingredientList;
    const cost = req.params.cost;

    //get new order ID
    let newOrderID = parseInt(await pool.query('SELECT MAX(order_id) FROM orders'));
    newOrderID += 1;

    //get current date and time
    const now = new Date(); 
    let dateForDatabase = now.getFullYear + "-" + now.getMonth + "-" + now.getDate;

    const updateResult = await pool.query("INSERT INTO orders (order_id, date_ordered, order_cost) VALUES ($1, '$2', $3)", [newOrderID, dateForDatabase, cost]);
    
    let newItemID = parseInt(await pool.query('SELECT MAX(item_id) FROM item_sold'));
    for (let i = 0; i < menuItems.length; i++){//adding menu items
      newItemID += 1;
      let MenuId = menuItems.get(i).first;
      // newOrderID = orderID
      let quantity = menuItems.get(i).second;

      newItemID += 1; //increment itemid
      let insertIntoItemSold = await pool.query("INSERT INTO item_sold (item_id, menu_item_id, order_id, item_sold_quantity) VALUES ('$1', '$2', '$3', '$4')", [newItemID, MenuId, newOrderID, quantity]);
      let updateMenu = await pool.query("UPDATE menu SET menu_item_sold_since_z = menu_item_sold_since_z + 1 WHERE menu_item_id= '$1'", [MenuId]);
      let inventoryItemsForMenuItems = await pool.query("SELECT * FROM recipe_item WHERE menu_id = $1", [MenuId]);
      //  check getInventoryItemsForMenu if this doesnt work
      const amt_used = inventoryItemsForMenuItems.rows.map((item) => item.amt_used);
      const inventory_id = inventoryItemsForMenuItems.rows.map((item) => item.inventory_id);

      //update inventory item by adding a menu item.
      for (let j = 0; j < inventoryItemsForMenuItemsArray.length; j++){//update the inventory based off of what is in each 
        let updateInventoryItem = await pool.query("UPDATE inventory_item SET inventory_item_quantity = inventory_item_quantity - $1 WHERE inventory_id = $2", [amt_used.get(i), inventory_id.get(i)]);
      }

    }
    for (let i = 0; i < ingredientList.length; i++){//adding inventory items
      newItemID += 1;
      let inventoryID = ingredientList.get(i).first;
      let quantity = ingredientList.get(i).second;
      let insertIntoItemSold = await pool.query("INSERT INTO item_sold (item_id, inventory_id, order_id, item_sold_quantity) VALUES ('$1', '$2', '$3', '$4')", [newItemID, inventoryID, newOrderID, quantity]);
      let updateInventoryItem = await pool.query("UPDATE inventory_item SET inventory_item_quantity = inventory_item_quantity - $1 WHERE inventory_id = $2", [quantity, inventoryID]);
    }
    

    res.status(200).json({ message: 'Added Order!' });
  } catch (err) {
    console.error("Read failed with error in getCart " +err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('*', (req, res) => {
  console.log("sent unknown request");
  res.sendFile(path.resolve(__dirname, '../../../public', 'index.html'));
});


// Start the server
app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
