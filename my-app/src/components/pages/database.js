/**

 * Import required packages
 * @const {object} express - Express application
 * @const {object} Pool - PostgreSQL connection pool
 * @const {object} cors - Cross-Origin Resource Sharing
 * @const {function} v4 - Generates unique identifiers
 * @const {object} path - Utility for working with file and directory paths
 * @const {object} copyFileSync - Copy files synchronously
 
*/
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const uuid = require('uuid').v4;
const path = require('path');
const { copyFileSync } = require('fs');
// const { GetInventoryList } = require('./databaseFunctions');
// Set up server

/**
 * 
 * Create Express application
 * @const {object} app - Express application
 */
const app = express();
/**
 * 
 * Parse incoming JSON data
 */
app.use(express.json());
/**
 * 
 * Serve static files from public directory
 * @param {string} path.join(__dirname, '../../../public') - Path to public directory
 */
app.use(express.static(path.join(__dirname, '../../../public')));

/**
 *
 * Array of allowed origins
 * @const {Array.&lt;string>} allowedOrigins - List of allowed origins
 */
const allowedOrigins = ['https://revs-american-grill-z267.onrender.com', 'http://localhost:3000']
/**

Enable Cross-Origin Resource Sharing
@param {object} cors - CORS configuration object
*/
app.use(cors({
  origin: allowedOrigins
}));

/**
* 
* Set headers to allow cross-origin requests
* @param {object} req - Express request object
* @param {object} res - Express response object
* @param {function} next - Callback function to call next middleware
*/
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Credentials', '*');
  next();
});



//app.options('*', cors());

console.log("db document running");
/**

Connect to PostgreSQL database
@type {Pool}
@property {string} host - The host name of the database server.
@property {string} user - The user name to authenticate as.
@property {string} database - The name of the database to use.
@property {string} password - The password to use when authenticating.
@property {function} connect - Function to establish a connection to the database server
*/
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

/**
 
Define an endpoint that returns data from the 'users' table
@function
@name app.get
@param {string} path - Route URL path
@param {function} callback - Callback function that handles the HTTP GET request and response
@throws {error} Throws an error if the response fails.
@returns {object} JSON object representing rows of data returned from the database.
*/
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
/**

@description Fetches inventory items from the database within a certain range of inventory IDs.
@param {Number} req.params.start - The starting ID of the inventory range.
@param {Number} req.params.end - The ending ID of the inventory range.
@returns {Object[]} An array of objects representing inventory items.
@throws {Object} If an error occurs during the database read, an object with an error message is returned.
*/
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
  } catch (err) {
    console.error("Read failed with error in inventoryRequest: " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 
@description Fetches the list of recipes on the menu from the database.
@returns {Object[]} An array of objects representing the recipes on the menu.
@throws {Object} If an error occurs during the database read, an object with an error message is returned.
*/
app.get('/recipeRequest', async (req, res) => {
  try {
    var queryToUse = 'SELECT * FROM recipe_item ORDER BY recipe_id';
    console.log(queryToUse);
    const { rows } = await pool.query(queryToUse);
    res.json(rows);

  } catch (err) {
    console.error("Read failed with error in inventoryRequest: " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 
@description Fetches the entire menu list from the database.
@returns {Object[]} An array of objects representing the menu items.
@throws {Object} If an error occurs during the database read, an object with an error message is returned.
*/
app.get('/menuListRequest', async (req, res) => {
  try {
    var queryToUse = 'SELECT menu_item_id, menu_item_name, menu_item_cost FROM menu ORDER BY menu_item_id';
    console.log(queryToUse);
    const { rows } = await pool.query(queryToUse);
    res.json(rows);

  } catch (err) {
    console.error("Read failed with error in inventoryRequest: " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**

@description Fetches orders from the database within a certain range of dates.
@param {String} req.params.start - The starting date of the range.
@param {String} req.params.end - The ending date of the range.
@returns {Object[]} An array of objects representing orders.
@throws {Object} If an error occurs during the database read, an object with an error message is returned.
*/
app.get('/orderRequest/:start/:end', async (req, res) => {
  try {
    const start = req.params.start;
    const end = req.params.end;
    console.log("start:", start);
    console.log("end:", end);
    if (start === '2020-01-01' && end === '2025-01-01') {
      //console.log('SELECT * FROM orders ORDER BY order_id DESC LIMIT 30');
      const { rows } = await pool.query('SELECT * FROM orders ORDER BY order_id DESC LIMIT 30');
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

/**
 *
 * Get the popular menu item combinations sold together within a specified date range.
 * @function
 * @name soldTogetherRequest
 * @memberof module:routes
 * @param {object} req - The HTTP request object.
 * @param {string} req.params.start - The start date of the date range in 'YYYY-MM-DD' format.
 * @param {string} req.params.end - The end date of the date range in 'YYYY-MM-DD' format.
 * @param {object} res - The HTTP response object.
 * @returns {object[]} An array of objects representing the popular menu item combinations sold together.
 * @throws {object} Throws an error if the database query fails.
 */
app.get('/soldTogether/:start/:end', async (req, res) => {
  try {
    var popularCombos = [];
    var queryToUse;
    var initialDateString = req.params.start;
    var finalDateString = req.params.end;
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
      const combo = { ID: i, menuItem1: menuItem1, menuItem2: menuItem2, comboCount: comboCount };
      i++;
      if (menuItem1 != "Burger/Sandwich Combo" && menuItem1 != "Basket Combo" && menuItem1 != "Silverware" && menuItem2 != "Burger/Sandwich Combo" && menuItem2 != "Basket Combo" && menuItem2 != "Silverware")
        popularCombos.push(combo);
    }
    res.json(popularCombos);
    //console.log(popularCombos);

  } catch (err) {
    console.error("Read failed with error in soldTogetherRequest: " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
/**

Retrieve the password for a given email.
@function
@param {object} req - The request object.
@param {object} res - The response object.
@returns {object} - The password for the specified email.
@throws {error} - Internal server error.
*/
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

/**
 
Retrieve the restock report which are inventory items from the database that need to be restocked.
@function
@param {object} req - The request object.
@param {object} res - The response object.
@returns {object} - The inventory items that need to be restocked.
@throws {error} - Internal server error.
*/
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

/**
 
Retrieve the X Report Table which is a table with all zreports overall results.
@function
@param {object} req - The request object.
@param {object} res - The response object.
@returns {object} - The X Report Table with all zreports overall results.
@throws {error} - Internal server error.
*/
app.get('/xreportRequest', async (req, res) => {
  try {
    var queryToUse;
    queryToUse = 'SELECT * FROM zreports ORDER BY report_id';
    console.log(queryToUse);
    const { rows } = await pool.query(queryToUse);
    res.json(rows);
    //console.table(rows);

  } catch (err) {
    console.error("Read failed with error in X Report Request: " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 
Retrieve the Z Report Table based on the report ID.
@function
@param {object} req - The request object.
@param {object} res - The response object.
@returns {object} - The Z Report Table based on the report ID.
@throws {error} - Internal server error.
*/
app.get('/zreportRequest/:ID', async (req, res) => {
  try {
    const ID = parseInt(req.params.start);
    console.log(ID);
    var queryToUse;
    queryToUse = 'SELECT * FROM zreportcontent WHERE report_id = $1';
    queryValues = [ID];
    // console.log(queryToUse);
    const { rows } = await pool.query(queryToUse, queryValues);
    res.json(rows);
    console.table(rows);

  } catch (err) {
    console.error("Read failed with error in Z Report Request: " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**

Fetch sales history from database between given start and end dates

@param {Object} req - HTTP request object

@param {Object} res - HTTP response object
*/
//Fetch sales history from database where start and end are dates
app.get('/salesHistoryRequest/:start/:end', async (req, res) => {
  try {
    const start = req.params.start;
    const end = req.params.end;
    // console.log("start:", start);
    // console.log("end:", end);
    var queryToUse = 'SELECT Menu.MENU_ITEM_ID, Menu.MENU_ITEM_NAME, SUM(item_sold.ITEM_SOLD_QUANTITY) AS TOTAL_QUANTITY FROM item_sold ' +
      'JOIN Menu ON Menu.MENU_ITEM_ID = item_sold.MENU_ITEM_ID JOIN Orders ON Orders.ORDER_ID = item_sold.ORDER_ID ' +
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
/**

Fetch excess requests from database between given start and end dates

@param {Object} req - HTTP request object

@param {Object} res - HTTP response object
*/
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
/**

Update inventory items in the database

@param {Object} req - HTTP request object

@param {Object} res - HTTP response object
*/
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
    console.error("Read failed with error in inventoryUpdate: " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Update Menu items from table
/**

Updates a menu item in the database
@function
@async
@param {object} req - The HTTP request object
@param {object} res - The HTTP response object
@param {number} req.params.ID - The ID of the menu item to be updated
@param {string} req.params.name - The updated name of the menu item
@param {number} req.params.cost - The updated cost of the menu item
@throws {error} Throws an error if the query fails
@returns {object} Returns a JSON object with a message indicating that the menu item was updated successfully
*/
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
    console.error("Read failed with error in menuUpdate: " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Update Recipe items from table
/**
 * Update Recipe items from table
 *
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} JSON response indicating success or error
 *
 * @throws {Error} If any error occurs during the database query
 */

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
    console.error("Read failed with error in recipesUpdate: " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Add Inventory items to table
/**
 * Adds an inventory item to the table.
 * 
 * @param {string} name - The name of the inventory item.
 * @param {number} cost - The cost of the inventory item.
 * @param {number} quantity - The quantity of the inventory item.
 * @returns {Promise} - Promise object represents the successful addition of the inventory item.
 * @throws {Error} - If there's an error while adding the inventory item to the table.
 */
app.get('/inventoryAddItem/:name/:cost/:quantity', async (req, res) => {
  try {
    //get next inventory id
    var queryToUse = "SELECT MAX(INVENTORY_ID) as max_id FROM inventory_item";
    console.log(queryToUse);
    const { rows } = await pool.query(queryToUse);
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
    console.error("Read failed with error in inventoryAddItem: " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Add Menu items to table
/**

Add a new item to the menu table

@function

@async

@param {string} req.params.name - The name of the new item to add to the menu

@param {number} req.params.cost - The cost of the new item to add to the menu

@throws {Error} Will throw an error if there is an issue adding the item to the database

@returns {object} Returns a JSON object indicating success or failure of the operation
*/
app.get('/menuAddItem/:name/:cost', async (req, res) => {
  try {
    //get next inventory id
    var queryToUse = "SELECT MAX(MENU_ITEM_ID) as max_id FROM menu";
    console.log(queryToUse);
    const { rows } = await pool.query(queryToUse);
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
    console.error("Read failed with error in menuAddItem: " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Add Recipe items to table
/**

Adds a recipe item to the database.
@param {object} req - The request object containing the recipe item details.
@param {string} req.params.name - The name of the recipe item.
@param {number} req.params.invID - The inventory ID of the recipe item.
@param {number} req.params.menuID - The menu ID of the recipe item.
@param {number} req.params.quantity - The quantity of the recipe item.
@param {object} res - The response object to send the result.
@returns {Promise<void>} - A promise that resolves with the success message or rejects with an error message.
@throws {Error} - Throws an error if there is a problem with the query or server.
*/
app.get('/recipesAddItem/:name/:invID/:menuID/:quantity', async (req, res) => {
  try {
    //get next inventory id
    var queryToUse = "SELECT MAX(RECIPE_ID) as max_id FROM recipe_item";
    console.log(queryToUse);
    const { rows } = await pool.query(queryToUse);
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
    console.error("Read failed with error in recipesAddItem: " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Delete an inventory item from the table.
 *
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {number} req.params.ID - The ID of the inventory item to delete.
 * @throws {Error} If there is an error deleting the item.
 * @returns {Object} A JSON object with a success message on successful deletion.
 */
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
    console.error("Read failed with error in inventoryDeleteItem: " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**

Deletes a menu item from the menu table in the database.

@param {object} req - The HTTP request object.

@param {object} res - The HTTP response object.

@returns {object} HTTP response object with a success or error message.

@throws {object} Error message in case of server error.
*/
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
    console.error("Read failed with error in menuDeleteItem: " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
/**

Deletes a recipe item from the recipe_item table by its ID.

@function

@async

@param {Object} req - Express request object.

@param {Object} res - Express response object.

@param {number} req.params.ID - ID of the recipe item to be deleted.

@throws {Error} 500 - Internal server error.

@returns {Object} - JSON object with a message indicating the success of the operation.
*/
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
    console.error("Read failed with error in recipesDeleteItem: " + err);
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

/**

Retrieves inventory items used in menu items within a specified range of menu items.
@param {object} req - Express request object.
@param {object} res - Express response object.
@param {number} req.params.start - The starting menu item ID to retrieve inventory items from.
@param {number} req.params.end - The ending menu item ID to retrieve inventory items from.
@returns {object} - Returns an object with an array of inventory items used in menu items within the specified range.
@throws {error} - Throws a 500 error if there was an internal server error or failed to retrieve the inventory items.
*/
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
/**
 * Check if a row exists for the given session ID in the 'cart' table of the database.
 * If a row does not exist, insert a new row for the session ID into the table.
 *
 * @param {object} req - The request object.
 * @param {string} req.params.id - The session ID to check.
 * @param {object} res - The response object.
 * @returns {object} A response JSON object indicating whether the session ID was added or already exists in the cart.
 * @throws {object} An error object if there was an error checking the session ID.
 */

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
/**
 * Ends a session by deleting it from the cart table in the database.
 * @param {Object} req - The request object.
 * @param {string} req.params.id - The ID of the session to end.
 * @param {Object} res - The response object.
 * @returns {Object} A JSON object indicating whether the session was successfully deleted or not.
 * @throws {Error} Throws an error if there was an issue with checking the session ID or deleting it from the database.
 */

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
/**
 * Adds an item to the user's cart for a given session ID.
 * 
 * @param {string} req.params.id - The session ID for the user's cart.
 * @param {object} req.body - The item to add to the cart.
 * @param {string} req.body.name - The name of the item to add.
 * @param {number} req.body.quantity - The quantity of the item to add.
 * @returns {object} A JSON object with a success message if the item was added to the cart.
 * @throws {object} An error object with a 500 status code and an error message if there was an error adding the item to the cart.
 */

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
/**

Express route handler for creating a new order

@param {Object} req - Express request object

@param {string} req.params.cookie - Session ID of the user

@param {string} req.params.cost - Total cost of the order

@param {Object} res - Express response object

@returns {void}
*/
app.get('/createNewOrder/:cookie/:cost', async (req, res) => {
  try {
    const myID = req.params.cookie;
    const orderPrice = req.params.cost;
    console.log("Price: ", orderPrice);

    //add to the orders table
    let newOrderIDquery = await pool.query('SELECT MAX(order_id) FROM orders');
    let newOrderID = newOrderIDquery.rows[0].max;
    let newItemIDquery = await pool.query('SELECT MAX(item_id) FROM item_sold');
    let newItemID = newItemIDquery.rows[0].max;
    newOrderID += 1;
    //get current date and time
    const now = new Date();
    let year = parseInt(now.getFullYear());
    let month = parseInt(now.getMonth()) + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let date = parseInt(now.getDate());
    // console.log("year/month/date: " + year + month + date);
    let dateForDatabase = year + "-" + month + "-" + date;
    let queryToUse = "INSERT INTO orders (order_id, date_ordered, order_cost) VALUES (" + newOrderID + ", '" + dateForDatabase + "', " + orderPrice + ")";
    console.log("adding this to cart: " + queryToUse);
    const updateResult = await pool.query(queryToUse);//UNCOMMENT THIS LINE TO ADD TO THE ORDER TABLE IN DATABASE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log("order table updaded");


    var result = await pool.query('SELECT * FROM cart WHERE sessionid = $1', [myID]);
    result = result.rows[0].orderlist; //gets just the cart
    var itemCount = 0;
    for (let i = 0; i < result.length; i++) {
      var thisItem = JSON.parse(result[i]);
      if (thisItem.type === "item") {
        itemCount++;
      }
    } //this loop counts how many individual items there are

    //console.log(itemCount, "items in the cart.");
    for (let id = 1; id < itemCount + 1; id++) { //number of items in cart
      const itemArr = []; //the item and all its mods
      var modStartIndex = -1;
      var modEndIndex = -1;
      var pos = 1;
      var itemQ = 0; //count of this item
      var itemName = "";
      for (let i = 0; i < result.length; i++) {
        var thisItem = JSON.parse(result[i]);
        if (thisItem.type === "item") {
          if (pos === (id - 1)) { //will never hit for first item
            modStartIndex = i + 1;
            pos++;
          } else if (pos === (id)) { //the item we're removing
            modEndIndex = i;
            itemQ = thisItem.quantity;
            itemName = thisItem.name;
            pos++;
          } else {
            pos++;
          }
        }
      } //end loop that sets start and end index
      //console.log("Indexes to clear: ", modStartIndex, " to ", modEndIndex, " from ", result);
      //console.log("Found ", itemQ, " ", itemName, "with indexes ", modStartIndex, " to ", modEndIndex);
      for (let i = 0; i < result.length; i++) {
        if (!(i < modStartIndex || i > modEndIndex)) {
          itemArr.push(result[i]);
        }
      } //this loop inits our item, with the quantity value
      //console.log("Full item info: ", itemArr);
      for (const itm of itemArr) {
        var foodItem = JSON.parse(itm);
        newItemID += 1; //this is just for item sold
        if (foodItem.type === "item" || foodItem.name === "Combo" || foodItem.type === "Basket Combo") {
          if (foodItem.name === "Combo") {
            foodItem.name = "Burger/Sandwich Combo";
          }
          let menuIdquery = await pool.query("SELECT menu_item_id FROM menu WHERE menu_item_name = $1", [foodItem.name]);
          let menuId = menuIdquery.rows[0].menu_item_id;
          queryToUse = "INSERT INTO item_sold (item_id, menu_item_id, order_id, item_sold_quantity) VALUES ('" + newItemID + "', '" + menuId + "', '" + newOrderID + "', '" + itemQ + "')";
          console.log("Inserting item ", newItemID, " with menu id ", menuId, " to order", newOrderID, "with quantity", itemQ);
          let insertIntoItemSold = await pool.query(queryToUse);
          let updateMenu = await pool.query("UPDATE menu SET menu_item_sold_since_z = menu_item_sold_since_z + 1 WHERE menu_item_id= $1", [menuId]);
          let inventoryItemsForMenuItems = await pool.query("SELECT * FROM recipe_item WHERE menu_id = $1", [menuId]);
          const amt_used = inventoryItemsForMenuItems.rows.map((item) => item.amt_used);
          const inventory_id = inventoryItemsForMenuItems.rows.map((item) => item.inventory_id);
          //update inventory item by adding a menu item.
          for (let j = 0; j < inventory_id.length; j++) {//update the inventory based off of what is in each
            //console.log("inventory_id at: " + inventory_id[j] + " with " + amt_used[j]*itemQ + " units used.");
            await pool.query("UPDATE inventory_item SET inventory_item_quantity = inventory_item_quantity - $1 WHERE inventory_id = $2", [amt_used[j] * itemQ, inventory_id[j]]);
          }
        } //end loop for food type item
        else { //these are the mods that aren't combo.
          let inventoryIdQuery = await pool.query("SELECT inventory_id FROM inventory_item WHERE inventory_item_name = $1", [foodItem.name]);
          //console.log("Inv id query: ", inventoryIdQuery);
          //console.log("Inv id query row 0: ", inventoryIdQuery[0]);
          let inventoryID = inventoryIdQuery.rows[0].inventory_id;
          //console.log("inventory id for ", foodItem.name, " is ", inventoryID);
          let quantity = foodItem.quantity; //change based on stuff below

          if (foodItem.name === "Beef Patty") {
            if (foodItem.quantity === -1) {
              //special case; has to push black bean apart from removing beef patty
              console.log("Inserting item ", newItemID, " with inv id ", 3, " to order", newOrderID, "with quantity", quantity);
              await pool.query("INSERT INTO item_sold (item_id, inventory_id, order_id, item_sold_quantity) VALUES ($1, $2, $3, $4)", [newItemID, 3, newOrderID, itemQ]);
              await pool.query("UPDATE inventory_item SET inventory_item_quantity = inventory_item_quantity - $1 WHERE inventory_id = $2", [itemQ, 3]);
              newItemID += 1;
            }
          }
          else if (foodItem.name === "Vanilla Ice Cream") {
            if (foodItem.quantity === -1) {
              inventoryID = 18; //chocolate
              quantity = 1;
            }
            else if (foodItem.quantity === 0) {
              inventoryID = 19; //vanilla
              quantity = 1;
            }
            else if (foodItem.quantity === 1) {
              inventoryID = 21; //coffee
              quantity = 1;
            }
            else {
              inventoryID = 20; //strawberry
              quantity = 1;
            }
          }
          else if (foodItem.name === "x") {
            if (foodItem.quantity === -1) {
              inventoryID = 24;
              quantity = 1;
              //ingredientList.push(pair); //add a buffalo sauce
            }
            else if (foodItem.quantity === 0) {
              inventoryID = 25;
              quantity = 1;
              //ingredientList.push(pair); //add a BBQ sauce
            }
            else if (foodItem.quantity === 1) {
              inventoryID = 26;
              quantity = 1;
              //ingredientList.push(pair); //add a Honey mustard sauce
            }
            else if (foodItem.quantity === 2) {
              inventoryID = 27;
              quantity = 1;
              //ingredientList.push(pair); //add a ranch sauce
            }
            else if (foodItem.quantity === 3) {
              inventoryID = 28;
              quantity = 1;
              //ingredientList.push(pair); //add a spicy ranch sauce
            }
            else if (foodItem.quantity === 4) {
              inventoryID = 4;
              quantity = 1;
              //ingredientList.push(pair); //add a gig em sauce
            }
          }
          //by now, we have the ID of the item we're changing and the quantity for a single unit
          quantity *= itemQ;
          console.log("Inserting item ", newItemID, " with inv id ", inventoryID, " to order", newOrderID, "with quantity", quantity);
          await pool.query("INSERT INTO item_sold (item_id, inventory_id, order_id, item_sold_quantity) VALUES ($1, $2, $3, $4)", [newItemID, inventoryID, newOrderID, quantity]);
          await pool.query("UPDATE inventory_item SET inventory_item_quantity = inventory_item_quantity - $1 WHERE inventory_id = $2", [quantity, inventoryID]);
        } //ends else for mods
      } //end looping through one food item and its mods
      //console.log("Done adding one whole item");
    }
    res.json(result);  //returns what was in the cart
  } catch (err) {
    console.error("Write failed with error in place order " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
/**

Handles requests to update the quantity of an item in the user's shopping cart.
@function
@async
@param {Object} req - The request object.
@param {Object} res - The response object.
@param {string} req.params.cookie - The session ID for the user.
@param {string} req.params.id - The ID of the item to update.
@param {string} req.params.quantity - The new quantity for the item.
@throws {Error} Will throw an error if the database write fails.
@returns {Object} The updated shopping cart.
*/
app.get('/updateQty/:cookie/:id/:quantity', async (req, res) => {
  try {
    const myID = req.params.cookie;
    const itemID = parseInt(req.params.id);
    const newQty = parseInt(req.params.quantity);
    var result = await pool.query('SELECT * FROM cart WHERE sessionid = $1', [myID]);
    //console.log("Result before simplifying: ", result);
    result = result.rows[0].orderlist; //gets just the cart
    //console.log("cart before:" , result);
    const updatedItems = [];

    if (newQty != 0) {
      console.log("Setting quantity to ", newQty, " for item ID ", itemID);
      var pos = 1;
      for (let i = 0; i < result.length; i++) {
        var thisItem = JSON.parse(result[i]);
        if (thisItem.type === "item") {
          if (pos === itemID) {
            console.log("Found item to update ", thisItem.name);
            thisItem.quantity = newQty;
            pos++;
          } else {
            console.log("Pos is ", pos, " and id is ", itemID);
            pos++;
          }
          updatedItems.push(JSON.stringify(thisItem));
        } else {
          updatedItems.push(JSON.stringify(thisItem));
        }
      }
    } else { //remove item from cart
      var modStartIndex = -1;
      var modEndIndex = -1;
      var pos = 1;
      for (let i = 0; i < result.length; i++) {
        var thisItem = JSON.parse(result[i]);
        if (thisItem.type === "item") {
          if (pos === (itemID - 1)) { //will never hit for first item
            modStartIndex = i + 1;
            pos++;
          } else if (pos === (itemID)) { //the item we're removing
            console.log("match found, itemID ", itemID, ", pos ", pos, " at index ", i);
            modEndIndex = i;
            pos++;
          } else {
            pos++;
            console.log("Incremented pos to ", pos);
          }
        }
      }

      console.log("Indexes to clear: ", modStartIndex, " to ", modEndIndex, " from ", result);

      for (let i = 0; i < result.length; i++) {
        if (i < modStartIndex || i > modEndIndex) {
          updatedItems.push(result[i]);
        }
      }
    } //end remove from cart func

    var updateResult = await pool.query('UPDATE cart SET orderlist = $1 WHERE sessionid = $2', [updatedItems, myID]);
    var check = await pool.query('SELECT * FROM cart WHERE sessionid = $1', [myID]);
    //console.log("Result before simplifying: ", result);
    check = check.rows[0].orderlist; //gets just the cart
    console.log("cart before:", result);
    console.log("cart after:", check);
    console.log("Result of update: ", updateResult, " with items ", updatedItems);
    res.json(result);
  } catch (err) {
    console.error("Write failed with error in updateCart " + err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
/**

Retrieve cart for a given session ID
@function
@async
@param {Object} req - Express request object
@param {Object} res - Express response object
@param {string} req.params.id - Session ID for the cart to retrieve
@throws {Error} Throws an error if the read operation fails
@returns {Promise} Returns a promise that resolves with a JSON object containing the retrieved cart data
*/
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

// app.post('/createOrder', async (req, res) => {
//   try {
//     // console.log("here 1.");
//     const requestOptions = req.body;
//     const menuItems = requestOptions.menuItems;
//     const ingredientList = requestOptions.ingredientList;
//     const cost = requestOptions.cost;
//     console.log("menuItems: " + menuItems);
//     console.log("ingredientItems: " + ingredientList);
//     console.log("cost: " + cost);
//     //get new order ID
//     let newOrderIDquery = await pool.query('SELECT MAX(order_id) FROM orders');
//     let newOrderID = newOrderIDquery.rows[0].max;
//     newOrderID += 1;
//     console.log("value of newOrderID = " + newOrderID);
//     //get current date and time
//     const now = new Date();
//     let year = parseInt(now.getFullYear());
//     let month = parseInt(now.getMonth()) + 1;
//     if (month < 10){
//       month = "0" + month;
//     }
//     let date = parseInt(now.getDate());
//     // console.log("year/month/date: " + year + month + date);
//     let dateForDatabase =  year + "-" + month + "-" + date;
//     let queryToUse = "INSERT INTO orders (order_id, date_ordered, order_cost) VALUES (" + newOrderID + ", '" + dateForDatabase + "', " + cost + ")"
//     const updateResult = await pool.query(queryToUse);//UNCOMMENT THIS LINE TO ADD TO THE ORDER TABLE IN DATABASE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//     console.log("order created");
//     let newItemIDquery = await pool.query('SELECT MAX(item_id) FROM item_sold');
//     let newItemID = newItemIDquery.rows[0].max;
//     console.log("value of newItemID = " + newItemID);
//     for (let i = 0; i < menuItems.length; i++) {//adding menu items
//       newItemID += 1;
//       let Menu_item_name = menuItems[i].first;
//
//       let MenuIdquery = await pool.query("SELECT menu_item_id FROM menu WHERE menu_item_name = $1", [Menu_item_name]);
//       let MenuId = MenuIdquery.rows[0].menu_item_id;
//       console.log(MenuId)
//       // newOrderID = orderID
//       let quantity = menuItems[i].second;
//       queryToUse = "INSERT INTO item_sold (item_id, menu_item_id, order_id, item_sold_quantity) VALUES ('" + newItemID + "', '" + MenuId + "', '" + newOrderID + "', '" + quantity + "')";
//       let insertIntoItemSold = await pool.query(queryToUse);
//       let updateMenu = await pool.query("UPDATE menu SET menu_item_sold_since_z = menu_item_sold_since_z + 1 WHERE menu_item_id= $1", [MenuId]);
//       let inventoryItemsForMenuItems = await pool.query("SELECT * FROM recipe_item WHERE menu_id = $1", [MenuId]);
//       //  check getInventoryItemsForMenu if this doesnt work
//       const amt_used = inventoryItemsForMenuItems.rows.map((item) => item.amt_used);
//       const inventory_id = inventoryItemsForMenuItems.rows.map((item) => item.inventory_id);
//       console.log("inventory_id: ");
//       console.log(inventory_id);
//
//       //update inventory item by adding a menu item.
//       for (let j = 0; j < inventory_id.length; j++) {//update the inventory based off of what is in each
//         console.log("inventory_id at: " + inventory_id[j]);
//         let updateInventoryItem = await pool.query("UPDATE inventory_item SET inventory_item_quantity = inventory_item_quantity - $1 WHERE inventory_id = $2", [amt_used[j], inventory_id[j]]);
//       }
//     }
//
//     for (let i = 0; i < ingredientList.length; i++) {//adding inventory items
//       newItemID += 1;
//       let inventoryID = ingredientList[i].first;
//       let quantity = ingredientList[i].second;
//       let insertIntoItemSold = await pool.query("INSERT INTO item_sold (item_id, inventory_id, order_id, item_sold_quantity) VALUES ('$1', '$2', '$3', '$4')", [newItemID, inventoryID, newOrderID, quantity]);
//       let updateInventoryItem = await pool.query("UPDATE inventory_item SET inventory_item_quantity = inventory_item_quantity - $1 WHERE inventory_id = $2", [quantity, inventoryID]);
//     }
//
//
//     res.status(200).json({ message: 'Added Order!' });
//   } catch (err) {
//     console.error("Read failed with error in getCart " + err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

 
/**
 * Responds to GET requests with an unknown route and sends the index.html file.
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get('*', (req, res) => {
  console.log("sent unknown request");
  res.sendFile(path.resolve(__dirname, '../../../public', 'index.html'));
});


// Start the server
/**
 * Starts the server and listens for incoming requests on port 10000.
 * @function
 * @param {number} port - The port on which to listen for incoming requests.
 * @returns {void}
 */
app.listen(10000, () => {
  console.log('Server listening on port 10000');
});
