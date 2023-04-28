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
    console.log(queryToUse);
    const { rows } = await pool.query(queryToUse);
    res.json(rows);
    //console.log(rows);

  } catch (err) {
    console.error("Read failed with error in inventoryRequest: " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Fetch Restock Report which are Inventory items from database that need to be restock
app.get('/soldTogether', async (req, res) => {
  try {
    var popularCombos = [];
    var queryToUse;
    var initialDateString = "2000-01-01";
    var finalDateString = "2025-01-01";
    queryToUse = "SELECT m1.MENU_ITEM_NAME AS MENU_ITEM_NAME_1, m2.MENU_ITEM_NAME AS MENU_ITEM_NAME_2, COUNT(*) AS combo_count " +
                    "FROM item_sold s1 " +
                    "JOIN item_sold s2 ON s1.ORDER_ID = s2.ORDER_ID AND s1.MENU_ITEM_ID < s2.MENU_ITEM_ID " +
                    "JOIN Menu m1 ON s1.MENU_ITEM_ID = m1.MENU_ITEM_ID " +
                    "JOIN Menu m2 ON s2.MENU_ITEM_ID = m2.MENU_ITEM_ID " +
                    "WHERE s1.ORDER_ID IN (SELECT ORDER_ID FROM orders WHERE DATE_ORDERED BETWEEN '" + initialDateString
                    + "' AND '" + finalDateString + "') " +
                    "GROUP BY m1.MENU_ITEM_NAME, m2.MENU_ITEM_NAME " +
                    "ORDER BY combo_count DESC";
    console.log(queryToUse);
    var i = 1;
    const { rows } = await pool.query(queryToUse);
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
    console.error("Read failed with error in inventoryRequest: " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/restockRequest', async (req, res) => {
  try {
    var queryToUse;
    queryToUse = 'SELECT * FROM inventory_item WHERE inventory_item_quantity <= 50';
    console.log(queryToUse);
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
    console.log("start:", start);
    console.log("end:", end);
    var queryToUse = 'SELECT Menu.MENU_ITEM_ID, Menu.MENU_ITEM_NAME, SUM(item_sold.ITEM_SOLD_QUANTITY) AS TOTAL_QUANTITY FROM item_sold ' +
              'JOIN Menu ON Menu.MENU_ITEM_ID = item_sold.MENU_ITEM_ID JOIN Orders ON Orders.ORDER_ID = item_sold.ORDER_ID '+
              'WHERE Orders.DATE_ORDERED BETWEEN $1 AND $2 GROUP BY Menu.MENU_ITEM_ID, Menu.MENU_ITEM_NAME';
    const queryValues = [start, end];

    console.log(queryToUse, queryValues);
    const { rows } = await pool.query(queryToUse, queryValues);
    res.json(rows);

  } catch (err) {
    console.error("Read failed with error in sales history Request: " + err);
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
    console.error("Read failed with error in inventoryRequest: " +err);
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
    console.error("Read failed with error in inventoryRequest: " +err);
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
    console.error("Read failed with error in inventoryRequest: " +err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Add Inventory items to table
app.get('/inventoryAddItem/:ID/:name/:cost/:quantity', async (req, res) => {
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

app.get('/createOrder/:menuItemsJSON/:ingredientListJson/:cost', async (req, res) => {
  try {
    console.log("here 1.");
    const menuItems = req.params.menuItemsJSON; 
    const ingredientList = req.params.ingredientListJSON;
    const cost = req.params.cost;
    console.log("here 2.");
    //get new order ID
    let newOrderID = parseInt(await pool.query('SELECT MAX(order_id) FROM orders'));
    newOrderID += 1;
    console.log("value of newOrderID = " + newOrderID);
    //get current date and time
    const now = new Date(); 
    console.log("now: " + now);
    let year = now.getFullYear;
    let month = now.getMonth;
    let date = now.getDate;
    console.log("year/month/date: " + year + month + date);
    let dateForDatabase =  year + "-" + month + "-" + date;
    console.log("current date: " + dateForDatabase);
    const updateResult = await pool.query("INSERT INTO orders (order_id, date_ordered, order_cost) VALUES ($1, '$2', $3)", [newOrderID, dateForDatabase, cost]);
    console.log("order created");
    let newItemID = parseInt(await pool.query('SELECT MAX(item_id) FROM item_sold'));
    for (let i = 0; i < menuItems.length; i++) {//adding menu items
      newItemID += 1;
      let Menu_item_name = menuItems.get(i).first;

      let MenuId = parseInt(await pool.query("SELECT menu_item_id FROM menu WHERE menu_item_name = $1", [Menu_item_name]));
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
      for (let j = 0; j < inventoryItemsForMenuItemsArray.length; j++) {//update the inventory based off of what is in each
        let updateInventoryItem = await pool.query("UPDATE inventory_item SET inventory_item_quantity = inventory_item_quantity - $1 WHERE inventory_id = $2", [amt_used.get(i), inventory_id.get(i)]);
      }

    }
    for (let i = 0; i < ingredientList.length; i++) {//adding inventory items
      newItemID += 1;
      let inventoryID = ingredientList.get(i).first;
      let quantity = ingredientList.get(i).second;
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
