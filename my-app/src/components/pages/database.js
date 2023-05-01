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


const allowedOrigins = ['https://revs-american-grill-z267.onrender.com', 'http://localhost:3000']
app.use(cors({
  origin: allowedOrigins
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Credentials', '*');
  next();
});



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
    if ((start === 0) && (end === 0)) {
      queryToUse = 'SELECT * FROM Menu ORDER BY MENU_ITEM_ID';
    }
    else {
      queryToUse = 'SELECT * FROM Menu WHERE MENU_ITEM_ID >= ' + start + ' AND MENU_ITEM_ID <= ' + end + ' ORDER BY MENU_ITEM_ID';
    }
    console.log(queryToUse);
    const { rows } = await pool.query(queryToUse);
    res.json(rows);
    //console.log(rows);
  } catch (err) {
    //console.log("error!");
    console.error("Read failed with error in menuRequest: " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Fetch Inventory items from database where start and end represent inventory IDs
app.get('/inventoryRequest/:start/:end', async (req, res) => {
  try {
    const start = parseInt(req.params.start);
    const end = parseInt(req.params.end);

    var queryToUse;
    if ((start === 0) && (end === 0)) {
      queryToUse = 'SELECT * FROM inventory_item ORDER BY inventory_id';
    }
    else {
      queryToUse = 'SELECT * FROM inventory_item WHERE inventory_id >= ' + start + ' AND inventory_id <= ' + end + ' ORDER BY inventory_id';
    }
    console.log(queryToUse);
    const { rows } = await pool.query(queryToUse);
    res.json(rows);
    //console.log(rows);

  } catch (err) {
    //console.log("error!");
    console.error("Read failed with error in inventoryRequest: " + err);
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
    console.error("Read failed with error in inventoryRequest: " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Fetch the whole menu list order by their id
app.get('/menuListRequest', async (req, res) => {
  try {
    var queryToUse;
    queryToUse = 'SELECT menu_item_id, menu_item_name, menu_item_cost FROM menu ORDER BY menu_item_id';
    // console.log(queryToUse);
    const { rows } = await pool.query(queryToUse);
    res.json(rows);
    //console.log(rows);

  } catch (err) {
    console.error("Read failed with error in inventoryRequest: " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Fetch orders from database where start and end are dates
app.get('/orderRequest/:start/:end', async (req, res) => {
  try {
    const start = req.params.start;
    const end = req.params.end;
    console.log("start:", start);
    console.log("end:", end);
    if (start === '2020-01-01' && end === '2023-04-01') {
      console.log('SELECT * FROM orders ORDER BY order_id DESC LIMIT 30');
      const { rows } = await pool.query('SELECT * FROM orders ORDER BY order_id DESC LIMIT 20');
      res.json(rows);
    } else {
      console.log('SELECT * FROM orders WHERE date_ordered BETWEEN $1 AND $2 ORDER BY order_id');
      const { rows } = await pool.query('SELECT * FROM orders WHERE date_ordered BETWEEN $1 AND $2 ORDER BY order_id', [start, end]);
      res.json(rows);
    }
    //console.table(rows);

  } catch (err) {
    //console.log("error!");
    console.error("Read failed with error in orderRequest: " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Fetch menu items that are more commonly sold together
app.get('/soldTogether', async (req, res) => {
  try {
    var popularCombos = [];
    var queryToUse;
    var initialDateString = "2000-01-01";
    var finalDateString = "2025-01-01";
    queryToUse = 'SELECT m1.MENU_ITEM_NAME AS MENU_ITEM_NAME_1, m2.MENU_ITEM_NAME AS MENU_ITEM_NAME_2, COUNT(*) AS combo_count ' +
                    'FROM item_sold s1 JOIN item_sold s2 ON s1.ORDER_ID = s2.ORDER_ID AND s1.MENU_ITEM_ID < s2.MENU_ITEM_ID ' +
                    'JOIN Menu m1 ON s1.MENU_ITEM_ID = m1.MENU_ITEM_ID JOIN Menu m2 ON s2.MENU_ITEM_ID = m2.MENU_ITEM_ID ' +
                    'WHERE s1.ORDER_ID IN (SELECT ORDER_ID FROM orders WHERE DATE_ORDERED BETWEEN $1 AND $2 ) ' +
                    'GROUP BY m1.MENU_ITEM_NAME, m2.MENU_ITEM_NAME ORDER BY combo_count DESC';
    var queryValues = [initialDateString, finalDateString];
    console.log(queryToUse, queryValues);
    var i = 1;
    const { rows } = await pool.query(queryToUse, queryValues);
    for (let row of rows) {
      //console.log(row);
      const menuItem1 = row.menu_item_name_1;
      const menuItem2 = row.menu_item_name_2;
      const comboCount = row.combo_count;
      //console.log(row.MENU_ITEM_NAME_1);
      //console.log(menuItem1);
      const combo = {ID: i, menuItem1: menuItem1, menuItem2: menuItem2, comboCount: comboCount};
      i++;
      if(menuItem1 != "Burger/Sandwich Combo" && menuItem1 != "Basket Combo" && menuItem1 != "Silverware" && menuItem2 != "Burger/Sandwich Combo" && menuItem2 != "Basket Combo" && menuItem2 != "Silverware")
        popularCombos.push(combo);
    }
    res.json(popularCombos);
    //console.log(popularCombos);

  } catch (err) {
    console.error("Read failed with error in soldTogetherRequest: " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/password/:email', async (req, res) => {
  try {
    var queryToUse;
    const email = req.params.email;
    queryToUse = "SELECT PASSWORD FROM Employee WHERE EMAIL = '" + email + "';";
    console.log(queryToUse);
    const { rows } = await pool.query(queryToUse);
    console.log(rows);
    res.json(rows);

  } catch (err) {
    console.error("Read failed with error in Login Request: " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Fetch Restock Report which are Inventory items from database that need to be restock
app.get('/restockRequest', async (req, res) => {
  try {
    var queryToUse;
    queryToUse = 'SELECT * FROM inventory_item WHERE inventory_item_quantity <= 50';
    // console.log(queryToUse);
    const { rows } = await pool.query(queryToUse);
    res.json(rows);
    //console.log(rows);

  } catch (err) {
    console.error("Read failed with error in Restock Request: " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Fetch sales history from database where start and end are dates
app.get('/salesHistoryRequest/:start/:end', async (req, res) => {
  try {
    const start = req.params.start;
    const end = req.params.end;
    // console.log("start:", start);
    // console.log("end:", end);
    var queryToUse = 'SELECT Menu.MENU_ITEM_ID, Menu.MENU_ITEM_NAME, SUM(item_sold.ITEM_SOLD_QUANTITY) AS TOTAL_QUANTITY FROM item_sold ' +
              'JOIN Menu ON Menu.MENU_ITEM_ID = item_sold.MENU_ITEM_ID JOIN Orders ON Orders.ORDER_ID = item_sold.ORDER_ID '+
              'WHERE Orders.DATE_ORDERED BETWEEN $1 AND $2 GROUP BY Menu.MENU_ITEM_ID, Menu.MENU_ITEM_NAME';
    const queryValues = [start, end];

    // console.log(queryToUse, queryValues);
    const { rows } = await pool.query(queryToUse, queryValues);
    res.json(rows);

  } catch (err) {
    console.error("Read failed with error in sales history Request: " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Fetch orders from database where start and end are dates
app.get('/excessRequest/:start/:end', async (req, res) => {
  try {
    const start = req.params.start;
    const end = req.params.end;
    console.log("start:", start);
    console.log("end:", end);

    var queryToUse = "SELECT SUM(AMT_USED) AS total_amt_used, i.INVENTORY_ID, i.INVENTORY_ITEM_NAME " +
                  "FROM Recipe_Item r JOIN Inventory_Item i ON r.INVENTORY_ID = i.INVENTORY_ID " +
                  "JOIN Item_Sold s ON r.MENU_ID = s.MENU_ITEM_ID JOIN Orders o ON s.ORDER_ID = o.ORDER_ID " +
                  "WHERE o.DATE_ORDERED BETWEEN $1 AND $2 GROUP BY i.INVENTORY_ID, i.INVENTORY_ITEM_NAME"
    const queryValues = [start, end];

    //console.log(querryToUse, queryValues);
    const { rows } = await pool.query(queryToUse, queryValues);
    res.json(rows);

  } catch (err) {
    //console.log("error!");
    console.error("Read failed with error in excessRequest: " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//Update Inventory items from table
app.get('/inventoryUpdate/:ID/:name/:cost/:quantity', async (req, res) => {
  try {
    const ID = parseInt(req.params.ID);
    const name = req.params.name;
    const cost = parseFloat(req.params.cost);
    const quantity = parseInt(req.params.quantity);
    //console.log(ID, name, cost, quantity);

    var queryString = 'UPDATE inventory_item SET INVENTORY_ITEM_NAME = $1, INVENTORY_ITEM_COST = $2, INVENTORY_ITEM_QUANTITY = $3 WHERE inventory_id = $4';
    const queryValues = [name, cost, quantity, ID];

    await pool.query(queryString, queryValues);
    //console.log('Inventory_item table updated sucessfully!');
    res.status(200).json({ message: 'Inventory item updated successfully' });
  } catch (err) {
    //console.log("error!");
    console.error("Read failed with error in inventoryUpdate: " +err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Update Menu items from table
app.get('/menuUpdate/:ID/:name/:cost', async (req, res) => {
  try {
    const ID = parseInt(req.params.ID);
    const name = req.params.name;
    const cost = parseFloat(req.params.cost);
    //console.log(ID, name, cost);

    var queryString = 'UPDATE menu SET MENU_ITEM_NAME = $1, MENU_ITEM_COST = $2 WHERE menu_item_id = $3';
    const queryValues = [name, cost, ID];

    console.log(queryString, queryValues);
    await pool.query(queryString, queryValues);
    //console.log('Inventory_item table updated sucessfully!');
    res.status(200).json({ message: 'Menu item updated successfully' });
  } catch (err) {
    //console.log("error!");
    console.error("Read failed with error in menuUpdate: " +err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Update Recipe items from table
app.get('/recipesUpdate/:ID/:name/:invID/:menuID/:quantity', async (req, res) => {
  try {
    const ID = parseInt(req.params.ID);
    const name = req.params.name;
    const invID = parseInt(req.params.invID);
    const menuID = parseInt(req.params.menuID);
    const quantity = parseInt(req.params.quantity);
    //console.log(ID, name, cost);

    var queryString = 'UPDATE recipe_item SET RECIPE_ITEM_NAME = $1, INVENTORY_ID = $2, MENU_ID = $3, AMT_USED = $4 WHERE recipe_id = $5';
    const queryValues = [name, invID, menuID, quantity, ID];

    await pool.query(queryString, queryValues);
    //console.log('Inventory_item table updated sucessfully!');
    res.status(200).json({ message: 'Menu item updated successfully' });
  } catch (err) {
    //console.log("error!");
    console.error("Read failed with error in recipesUpdate: " +err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Add Inventory items to table
app.get('/inventoryAddItem/:name/:cost/:quantity', async (req, res) => {
  try {
    //get next inventory id
    var queryToUse = "SELECT MAX(INVENTORY_ID) as max_id FROM inventory_item";
    console.log(queryToUse);
    const {rows} = await pool.query(queryToUse);
    //console.log(rows[0]['max_id']);

    const ID = parseInt(rows[0]['max_id']) + 1;
    console.log(ID);

    const name = req.params.name;
    const cost = parseFloat(req.params.cost);
    const quantity = parseInt(req.params.quantity);
    //console.log(ID, name, cost, quantity);

    var queryString = 'INSERT INTO inventory_item (inventory_ID, inventory_ITEM_NAME, inventory_item_cost, inventory_item_quantity) VALUES ($1, $2, $3, $4)';
    const queryValues = [ID, name, cost, quantity];

    await pool.query(queryString, queryValues);
    res.status(200).json({ message: 'Inventory item added successfully' });

  } catch (err) {
    console.error("Read failed with error in inventoryAddItem: " +err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Add Menu items to table
app.get('/menuAddItem/:name/:cost', async (req, res) => {
  try {
    //get next inventory id
    var queryToUse = "SELECT MAX(MENU_ITEM_ID) as max_id FROM menu";
    console.log(queryToUse);
    const {rows} = await pool.query(queryToUse);
    //console.log(rows[0]['max_id']);

    const ID = parseInt(rows[0]['max_id']) + 1;
    console.log(ID);

    const name = req.params.name;
    const cost = parseFloat(req.params.cost);
    //console.log(ID, name, cost);

    var queryString = 'INSERT INTO Menu (MENU_ITEM_ID, MENU_ITEM_NAME, MENU_ITEM_COST) VALUES ($1, $2, $3)';
    const queryValues = [ID, name, cost];

    await pool.query(queryString, queryValues);
    res.status(200).json({ message: 'Menu item added successfully' });

  } catch (err) {
    console.error("Read failed with error in menuAddItem: " +err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Add Recipe items to table
app.get('/recipesAddItem/:name/:invID/:menuID/:quantity', async (req, res) => {
  try {
    //get next inventory id
    var queryToUse = "SELECT MAX(RECIPE_ID) as max_id FROM recipe_item";
    console.log(queryToUse);
    const {rows} = await pool.query(queryToUse);
    //console.log(rows[0]['max_id']);

    const ID = parseInt(rows[0]['max_id']) + 1;
    console.log(ID);

    const name = req.params.name;
    const invID = parseInt(req.params.invID);
    const menuID = parseInt(req.params.menuID);
    const quantity = parseInt(req.params.quantity);
    //console.log(ID, name, cost);

    var queryString = 'INSERT INTO recipe_item (RECIPE_ID, RECIPE_ITEM_NAME, INVENTORY_ID, MENU_ID, AMT_USED) VALUES ($1, $2, $3, $4, $5)';
    const queryValues = [ID, name, invID, menuID, quantity];

    await pool.query(queryString, queryValues);
    res.status(200).json({ message: 'Recipe item added successfully' });

  } catch (err) {
    console.error("Read failed with error in recipesAddItem: " +err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Delete Inventory items from table
app.get('/inventoryDeleteItem/:ID', async (req, res) => {
  try {
    const ID = parseInt(req.params.ID);
    //console.log(ID);

    var queryString = 'DELETE FROM inventory_item WHERE inventory_id = $1';
    const queryValues = [ID];

    await pool.query(queryString, queryValues);
    //console.log('Inventory_item table updated sucessfully!');
    res.status(200).json({ message: 'Inventory item removed successfully' });
  } catch (err) {
    //console.log("error!");
    console.error("Read failed with error in inventoryDeleteItem: " +err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Delete Menu items from table
app.get('/menuDeleteItem/:ID', async (req, res) => {
  try {
    const ID = parseInt(req.params.ID);
    //console.log(ID);

    var queryString = 'DELETE FROM menu WHERE menu_item_id = $1';
    const queryValues = [ID];

    await pool.query(queryString, queryValues);
    //console.log('Inventory_item table updated sucessfully!');
    res.status(200).json({ message: 'Menu item removed successfully' });
  } catch (err) {
    //console.log("error!");
    console.error("Read failed with error in menuDeleteItem: " +err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Delete Recipes items from table
app.get('/recipesDeleteItem/:ID', async (req, res) => {
  try {
    const ID = parseInt(req.params.ID);
    //console.log(ID);

    var queryString = 'DELETE FROM recipe_item WHERE recipe_id = $1';
    const queryValues = [ID];

    await pool.query(queryString, queryValues);
    //console.log('Inventory_item table updated sucessfully!');
    res.status(200).json({ message: 'Recipe item removed successfully' });
  } catch (err) {
    //console.log("error!");
    console.error("Read failed with error in recipesDeleteItem: " +err);
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


app.get('/getInventoryItemsForMenu/:start/:end', async (req, res) => {
  try {
    const inventoryItems = [];
    const start = parseInt(req.params.start);
    var end = parseInt(req.params.end);
    if ((start === 0) && (end === 0)) {
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
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.get('/endSession/:id', async (req, res) => {
  try {
    const myID = req.params.id;

    const result = await pool.query('SELECT * FROM cart WHERE sessionid = $1', [myID]);

    if (result.rowCount === 0) {
      res.status(200).json({ message: 'Session ID does not exist in cart.' });
      //console.log("doesnt exist to delete!");
    } else {
      await pool.query('DELETE FROM cart WHERE sessionid = $1', [myID]);
      res.status(200).json({ message: 'Session ID removed from cart.' });
      //console.log("deleted!");
    }
  } catch (err) {
    console.error('Error checking session ID:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.post('/addToCart/:id', async (req, res) => {
  try {
    const myID = req.params.id;
    const item = req.body;
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
      console.log("Added to cart: ", item);
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
    console.error("Read failed with error in getCart " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/createOrder', async (req, res) => {
  try {
    // console.log("here 1.");
    const requestOptions = req.body;
    const menuItems = requestOptions.menuItems; 
    const ingredientList = requestOptions.ingredientList;
    const cost = requestOptions.cost;
    console.log("menuItems: " + menuItems);
    console.log("ingredientItems: " + ingredientList);
    console.log("cost: " + cost);
    //get new order ID
    let newOrderIDquery = await pool.query('SELECT MAX(order_id) FROM orders');
    let newOrderID = newOrderIDquery.rows[0].max;
    newOrderID += 1;
    console.log("value of newOrderID = " + newOrderID);
    //get current date and time
    const now = new Date(); 
    let year = parseInt(now.getFullYear());
    let month = parseInt(now.getMonth()) + 1;
    if (month < 10){
      month = "0" + month;
    }
    let date = parseInt(now.getDate());
    // console.log("year/month/date: " + year + month + date);
    let dateForDatabase =  year + "-" + month + "-" + date;
    let queryToUse = "INSERT INTO orders (order_id, date_ordered, order_cost) VALUES (" + newOrderID + ", '" + dateForDatabase + "', " + cost + ")"
    const updateResult = await pool.query(queryToUse);//UNCOMMENT THIS LINE TO ADD TO THE ORDER TABLE IN DATABASE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log("order created");
    let newItemIDquery = await pool.query('SELECT MAX(item_id) FROM item_sold');
    let newItemID = newItemIDquery.rows[0].max;
    console.log("value of newItemID = " + newItemID);
    for (let i = 0; i < menuItems.length; i++) {//adding menu items
      newItemID += 1;
      let Menu_item_name = menuItems[i].first;

      let MenuIdquery = await pool.query("SELECT menu_item_id FROM menu WHERE menu_item_name = $1", [Menu_item_name]);
      let MenuId = MenuIdquery.rows[0].menu_item_id;
      console.log(MenuId)
      // newOrderID = orderID
      let quantity = menuItems[i].second;
      queryToUse = "INSERT INTO item_sold (item_id, menu_item_id, order_id, item_sold_quantity) VALUES ('" + newItemID + "', '" + MenuId + "', '" + newOrderID + "', '" + quantity + "')";
      let insertIntoItemSold = await pool.query(queryToUse);
      let updateMenu = await pool.query("UPDATE menu SET menu_item_sold_since_z = menu_item_sold_since_z + 1 WHERE menu_item_id= $1", [MenuId]);
      let inventoryItemsForMenuItems = await pool.query("SELECT * FROM recipe_item WHERE menu_id = $1", [MenuId]);
      //  check getInventoryItemsForMenu if this doesnt work
      const amt_used = inventoryItemsForMenuItems.rows.map((item) => item.amt_used);
      const inventory_id = inventoryItemsForMenuItems.rows.map((item) => item.inventory_id);
      console.log("inventory_id: ");
      console.log(inventory_id);

      //update inventory item by adding a menu item.
      for (let j = 0; j < inventory_id.length; j++) {//update the inventory based off of what is in each
        console.log("inventory_id at: " + inventory_id[j]);
        let updateInventoryItem = await pool.query("UPDATE inventory_item SET inventory_item_quantity = inventory_item_quantity - $1 WHERE inventory_id = $2", [amt_used[j], inventory_id[j]]);
      }
    }

    for (let i = 0; i < ingredientList.length; i++) {//adding inventory items
      newItemID += 1;
      let inventoryID = ingredientList[i].first;
      let quantity = ingredientList[i].second;
      let insertIntoItemSold = await pool.query("INSERT INTO item_sold (item_id, inventory_id, order_id, item_sold_quantity) VALUES ('$1', '$2', '$3', '$4')", [newItemID, inventoryID, newOrderID, quantity]);
      let updateInventoryItem = await pool.query("UPDATE inventory_item SET inventory_item_quantity = inventory_item_quantity - $1 WHERE inventory_id = $2", [quantity, inventoryID]);
    }


    res.status(200).json({ message: 'Added Order!' });
  } catch (err) {
    console.error("Read failed with error in getCart " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('*', (req, res) => {
  console.log("sent unknown request");
  res.sendFile(path.resolve(__dirname, '../../../public', 'index.html'));
});


// Start the server
app.listen(10000, () => {
  console.log('Server listening on port 10000');
});
