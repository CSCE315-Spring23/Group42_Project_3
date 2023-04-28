import { useState, useEffect } from 'react';
const isLocalhost = window.location.hostname === 'localhost'; // Check if current hostname is localhost
const host = isLocalhost ? 'http://localhost:10000' : 'https://revs-american-grill-backend.onrender.com'; // Set host based on current environment

//const response = await fetch(`${host}/menuRequest/${start}/${end}`); // Use dynamic URL string based on current environment
/* Fetch menu items from list to display in table */
function GetMenuList(start, end) {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    async function fetchMenuItems() {
      const response = await fetch(`${host}/menuRequest/${start}/${end}`);
      const data = await response.json();
      setMenuItems(data);
      //console.log(data);
    }

    fetchMenuItems();
  }, [start, end]);

  return menuItems;
}

/************* POPULATE TABLES ***************/

/* Fetch menu items from list to display in table */
function GetInventoryTable(start, end){
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    async function fetchInventoryItems() {
      const response = await fetch(`${host}/inventoryRequest/${start}/${end}`);
      const data = await response.json();
      setInventoryItems(data);
      console.table(data);
    }

    fetchInventoryItems();
  }, [start, end]);

  //console.table(inventoryItems);
  return inventoryItems;
}

/* Fetch orders from list to display in table */
function GetOrdersTable(start, end){
  const [orders, setOrders] = useState([]);
  console.log(`${host}/orderRequest/${start}/${end}`);
  useEffect(() => {
    async function fetchOrders() {
      const response = await fetch(`${host}/orderRequest/${start}/${end}`);
      console.log("Bug test1");
      const data = await response.json();
      setOrders(data);
      console.table(data);
    }

    fetchOrders();
  }, [start, end]);

  return orders;
}

/* Fetch Menu list from menu */
function GetMenuTable() {
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    async function fetchMenuList() {
      const response = await fetch(`${host}/menuListRequest`);
      const data = await response.json();
      setMenuList(data);
      console.table(data);
    }

    fetchMenuList();
  }, []);

  return menuList;
}

/* Fetch recipe list from menu */
function GetRecipesTable(){
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      const response = await fetch(`${host}/recipeRequest`);
      const data = await response.json();
      setRecipes(data);
      console.table(data);
    }

    fetchRecipes();
  }, []);

  return recipes;
}

/* Fetch inventory list that needs restock to display in table */
function GetRestockReport() {
  const [restock, setRestocks] = useState([]);

  useEffect(() => {
    async function fetchRestocks() {
      const response = await fetch(`${host}/restockRequest`);
      const data = await response.json();
      setRestocks(data);
      console.table(data);
    }

    fetchRestocks();
  }, []);

  return restock;
}

/**************** EDIT TABLE ****************/

/* Update the inventory_item table with new values */
async function UpdateInventoryTable(id, name, cost, quantity) {
  try {
    const response = await fetch(`${host}/inventoryUpdate/${id}/${name}/${cost}/${quantity}`);
    const data = await response.json();
    console.log(data);

  } catch (err) {
    console.error('Error updating inventory item: ' + err);
  }
}

/* Update the menu table with new values */
function UpdateMenuTable(ID, name, cost){
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    async function fetchInventoryItems() {
      const response = await fetch(`${host}/menuUpdate/${ID}/${name}`);
      const data = await response.json();
      setInventoryItems(data);
      console.table(data);
    }

    fetchInventoryItems();
  }, [ID, name, cost]);

  //console.table(inventoryItems);
  return inventoryItems;
}

/* Update the Recipes table with new values */
function UpdateRecipesTable(ID, name, invID, menuID, quantity){
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    async function fetchInventoryItems() {
      const response = await fetch(`${host}/recipeUpdate/${ID}/${name}`);
      const data = await response.json();
      setInventoryItems(data);
      console.table(data);
    }

    fetchInventoryItems();
  }, [ID, name, invID, menuID, quantity]);

  //console.table(inventoryItems);
  return inventoryItems;
}

//fetch all menu items from database table
// function GetAllMenuList(){
//   const [menuItems, setMenuItems] = useState([]);

//   useEffect(() => {
//     async function fetchMenuItems() {
//       const response = await fetch(`http://localhost:10000/menuRequestAll/`);
//       const data = await response.json();
//       setMenuItems(data);
//     }

//     fetchMenuItems();
//   }, []);

//   return menuItems;
// }

//Fetch ingredient list to be display in table
function GetIngredients(start, end) {
  const [ingredientArr, setIngredientArr] = useState([]);

  useEffect(() => {
    async function fetchIngredients() {
      const response = await fetch(`${host}/getInventoryItemsForMenu/${start}/${end}`);
      const data = await response.json();
      //data.sort((a, b) => a.menu_id - b.menu_id);
      setIngredientArr(data);
    }

    fetchIngredients();
  }, [start, end]);

  return ingredientArr;
}

let addToCartPromise = Promise.resolve(); //synchronization thing
function AddToCart(type, name, quantity, price) {
  const myID = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/, "$1");
  //console.log("Adding " +quantity + " units of "+ type + ": " + name+ " to cart for user " + myID + " with price " + price);
  const item = { type, name, quantity, price };

  addToCartPromise = addToCartPromise.then(async () => {
    const response = await fetch(`${host}/addToCart/${myID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });
    const data = await response.json();
    console.log(data.message);
  });
}

// async function AddToCart(type, name, quantity, price) {
//   const myID = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/, "$1");
//
//   const item = { type, name, quantity, price };
//   console.log("adding type ", type, " name ", name);
//   const response = await fetch(`${host}/addToCart/${myID}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(item)
//   });
//   const data = await response.json();
//   console.log("added");
//   console.log(data.message);
// }


function GetCartItems() {
  const [myCart, setCart] = useState([]);
  var myID = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/, "$1");
  //console.log("getting cart");

  useEffect(() => {
    async function fetchCart() {
      const response = await fetch(`${host}/getCart/${myID}`);
      const data = await response.json();
      setCart(data.rows[0].orderlist);
      //console.log("cart in func: " + data.rows[0].orderlist);
    }
    fetchCart();
  }, [myID]);

  //console.log("cart: " + myCart); // should log an array of cart items
  const items = [];
  const modlist = [];
  var j = 1;

  if (myCart !== null) {
    for (let i = 0; i < myCart.length; i++) {
      const element = JSON.parse(myCart[i]);
      if (element.type === "item") {
        const item = { id: j, name: element.name, price: element.price, qty: 1, mods: [...modlist] }
        console.log("Mod list: ", item.mods);
        if (item.mods.indexOf("Fries Combo (+$1.90)") !== -1) {
          item.price += 1.9;
        }
        if (item.mods.indexOf("Chips Combo (+$1.90)") !== -1) {
          item.price += 1.9;
        }
        if (item.mods.indexOf("Drink Combo (+$1.10)") !== -1) {
          item.price += 1.1;
        }
        items.push(item);
        modlist.length = 0;
        j++;
      } else {
        if (element.name === "Beef Patty") {
          if (element.quantity === -1)
            modlist.push("SUB Black Bean Patty");
        }
        else if (element.name === "Combo") {
          if (element.quantity === 0) {
            modlist.push("Fries Combo (+$1.90)");
          }
          if (element.quantity === 1)
            modlist.push("Chips Combo (+$1.90)");
        }
        else if (element.name === "Basket Combo") {
          if (element.quantity === 0)
            modlist.push("Drink Combo (+$1.10)");
        }
        else if (element.name === "Vanilla Ice Cream") {
          if (element.quantity === -1)
            modlist.push("CHOCOLATE");
          else if (element.quantity === 0)
            modlist.push("VANILLA");
          else if (element.quantity === 1)
            modlist.push("COFFEE");
          else
            modlist.push("STRAWBERRY");
        }
        else if (element.name === "x") {
          if (element.quantity === -1)
            modlist.push("BUFFALO");
          else if (element.quantity === 0)
            modlist.push("BBQ");
          else if (element.quantity === 1)
            modlist.push("HONEY MUSTARD");
          else if (element.quantity === 2)
            modlist.push("RANCH");
          else if (element.quantity === 3)
            modlist.push("SPICY RANCH");
          else if (element.quantity === 4)
            modlist.push("GIG EM");
        }
        else {
          if (element.quantity === -1)
            modlist.push("NO " + element.name);
          else
            modlist.push("EXTRA " + element.name);
        }
      }
    };
  }
  return items;
}

function GetSoldTogether() {
  const [sold, setSold] = useState([]);

  useEffect(() => {
    async function fetchSoldTogether() {
      const response = await fetch(`${host}/soldTogether`);
      const data = await response.json();
      setSold(data);
      //console.table(data);
    }

    fetchSoldTogether();
  }, []);

  return sold;
}

// let createOrderPromise = Promise.resolve(); //synchronization thing
async function CreateOrderVectors() {
  // const [myCart, setCart] = useState([]);
  let myCart = [];
  var myID = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/, "$1");
  //console.log("getting cart");
  // var myID = 12;
  // useEffect(() => {
    async function fetchCart() {
      const response = await fetch(`http://localhost:10000/getCart/${myID}`);
      const data = await response.json();
      myCart = data.rows[0].orderlist;
      // setCart(data.rows[0].orderlist);
      console.log("myCart: " + myCart);
      //console.log("cart in func: " + data.rows[0].orderlist);
    }
    var temp = await fetchCart();
  // }, [myID]);
  console.log("here 3.");
  //console.log("cart: " + myCart); // should log an array of cart items
  const menuItems = [];
  const ingredientList = [];
  var j = 1;
  let cost = 0;

  if (myCart !== null) {
    for (let i = 0; i < myCart.length; i++) {
      const element = JSON.parse(myCart[i]);
      const item = { id: j, name: element.name, price: element.price, qty: 1}
      let pair = { first: item.name, second: item.qty};
      // console.log("element id: " + item.name + " element quantity: " + item.qty);
      console.log("pair is: " + pair + " -- first: " + pair.first + " second: " + pair.second);
      if(element.type === "item") {
        cost += item.price;
        menuItems.push(pair);
        ingredientList.length = 0;
        j++;
      }
      else {
        if (element.name === "Beef Patty") {
          if (element.quantity === -1) {
            ingredientList.push(pair);//add beef patty with -1 quantity
            pair.first = 3;
            pair.second = 1;
            ingredientList.push(pair);//add black bean patty
          }
        }
        else if (element.name === "Vanilla Ice Cream") {
          if (element.quantity === -1) {
            pair.first = 18;
            pair.second = 1;
            ingredientList.push(pair); //add a chocolate ice cream
          }
          else if (element.quantity === 0) {
            pair.first = 19;
            pair.second = 1;
            ingredientList.push(pair); //add a vanilla ice cream
          }
          else if (element.quantity === 1) {
            pair.first = 21;
            pair.second = 1;
            ingredientList.push(pair); //add a coffee ice cream
          }
          else {
            pair.first = 20;
            pair.second = 1;
            ingredientList.push(pair); //add a strawberru ice cream
          }
        }
        else if (element.name === "x") {
          if (element.quantity === -1) {
            pair.first = 24;
            pair.second = 1;
            ingredientList.push(pair); //add a buffalo sauce
          }
          else if (element.quantity === 0) {
            pair.first = 25;
            pair.second = 1;
            ingredientList.push(pair); //add a BBQ sauce
          }
          else if (element.quantity === 1) {
            pair.first = 26;
            pair.second = 1;
            ingredientList.push(pair); //add a Honey mustard sauce
          }
          else if (element.quantity === 2) {
            pair.first = 27;
            pair.second = 1;
            ingredientList.push(pair); //add a ranch sauce
          }
          else if (element.quantity === 3) {
            pair.first = 28;
            pair.second = 1;
            ingredientList.push(pair); //add a spicy ranch sauce
          }
          else if (element.quantity === 4) {
            pair.first = 4;
            pair.second = 1;
            ingredientList.push(pair); //add a gig em sauce
          }
        }
        else {
          if (element.quantity === -1) {
            ingredientList.push(pair); //push item with quanity -1
          }
          else {
            cost += element.price;
            ingredientList.push(pair); //push item with given quanity
          }
        }
      }
    }
  }
  console.log("here 4.");
  console.log("menuItems: " + menuItems);
    console.log("ingredientsList" + ingredientList);
    console.log(" cost: " + cost);
  return [menuItems, ingredientList, cost];
}

// let createOrderPromise = Promise.resolve(); //synchronization thing
async function CreateOrder(menuItems, ingredientList, cost) {
  const requestBody = {
    menuItems: menuItems,
    ingredientList: ingredientList,
    cost: cost
  };

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  };

  async function ordercreat() {
  const response = fetch(`http://localhost:3001/createOrder`, requestOptions);
  // const data = await response.json();
      // console.log(data.message);
  }
  await ordercreat();
  }
  // return items;


export {GetMenuList, GetIngredients, AddToCart, GetCartItems, GetInventoryTable, GetOrdersTable, GetSoldTogether,
          GetRestockReport, GetRecipesTable, GetMenuTable, CreateOrderVectors, CreateOrder, UpdateInventoryTable, UpdateMenuTable, UpdateRecipesTable};
