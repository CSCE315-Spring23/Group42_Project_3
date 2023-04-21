import { useState, useEffect } from 'react';

/* Fetch menu items from list to display in table */
function GetMenuList(start, end){
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    async function fetchMenuItems() {
      const response = await fetch(`http://localhost:3001/menuRequest/${start}/${end}`);
      const data = await response.json();
      setMenuItems(data);
    }

    fetchMenuItems();
  }, [start, end]);

  return menuItems;
}

/* Fetch menu items from list to display in table */
function GetInventoryList(start, end){
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    async function fetchInventoryItems() {
      const response = await fetch(`http://localhost:3001/inventoryRequest/${start}/${end}`);
      const data = await response.json();
      setInventoryItems(data);
    }

    fetchInventoryItems();
  }, [start, end]);

  return inventoryItems;
}

//fetch all menu items from database table
// function GetAllMenuList(){
//   const [menuItems, setMenuItems] = useState([]);

//   useEffect(() => {
//     async function fetchMenuItems() {
//       const response = await fetch(`http://localhost:3001/menuRequestAll/`);
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
      const response = await fetch(`http://localhost:3001/getInventoryItemsForMenu/${start}/${end}`);
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
    const response = await fetch(`http://localhost:3001/addToCart/${myID}`, {
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


function GetCartItems(){
  const [myCart, setCart] = useState([]);
  var myID = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/, "$1");
  //console.log("getting cart");

  useEffect(() => {
    async function fetchCart() {
      const response = await fetch(`http://localhost:3001/getCart/${myID}`);
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

  if(myCart !== null) {
    for (let i = 0; i < myCart.length; i++) {
      const element = JSON.parse(myCart[i]);
      if(element.type === "item") {
        const item = { id: j, name: element.name, price: element.price, qty: 1, mods: [...modlist]}
        items.push(item);
        modlist.length = 0;
        j++;
      } else {
          if(element.name === "Beef Patty") {
            if(element.quantity === -1)
              modlist.push("SUB Black Bean Patty");
          }
          else if(element.name === "Vanilla Ice Cream") {
            if(element.quantity === -1)
              modlist.push("CHOCOLATE");
            else if(element.quantity === 0)
              modlist.push("VANILLA");
            else if(element.quantity === 1)
              modlist.push("COFFEE");
            else
              modlist.push("STRAWBERRY");
          }
          else if(element.name === "x") {
            if(element.quantity === -1)
              modlist.push("BUFFALO");
            else if(element.quantity === 0)
              modlist.push("BBQ");
            else if(element.quantity === 1)
              modlist.push("HONEY MUSTARD");
            else if(element.quantity === 2)
              modlist.push("RANCH");
            else if(element.quantity === 3)
              modlist.push("SPICY RANCH");
            else if(element.quantity === 4)
              modlist.push("GIG EM");
          }
          else {
            if(element.quantity === -1)
              modlist.push("NO " + element.name);
            else
              modlist.push("EXTRA " + element.name);
          }
      }
    };
  }
  return items;
}

function createOrder(type, name, quantity, price) {
  const [myCart, setCart] = useState([]);
  var myID = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/, "$1");
  //console.log("getting cart");

  useEffect(() => {
    async function fetchCart() {
      const response = await fetch(`http://localhost:3001/getCart/${myID}`);
      const data = await response.json();
      setCart(data.rows[0].orderlist);
      //console.log("cart in func: " + data.rows[0].orderlist);
    }
    fetchCart();
  }, [myID]);

  //console.log("cart: " + myCart); // should log an array of cart items
  const menuItems = [];
  const ingredientList = [];
  var j = 1;
  let cost = 0;

  if(myCart !== null) {
    for (let i = 0; i < myCart.length; i++) {
      const element = JSON.parse(myCart[i]);
      let pair = { first: element.id, second: element.qty};
      if(element.type === "item") {
        cost += item.price;
        menuItems.push(pair);
        ingredientList.length = 0;
        j++;
      } 
      else {
          if(element.name === "Beef Patty") {
            if(element.quantity === -1){
              ingredientList.push(pair);//add beef patty with -1 quantity
              pair.first = 3;
              pair.second = 1;
              ingredientList.push(pair);//add black bean patty
            }
          }
          else if(element.name === "Vanilla Ice Cream") {
            if(element.quantity === -1){
              pair.first = 18;
              pair.second = 1;
              ingredientList.push(pair); //add a chocolate ice cream
            }
            else if(element.quantity === 0){
              pair.first = 19;
              pair.second = 1;
              ingredientList.push(pair); //add a vanilla ice cream
            }
            else if(element.quantity === 1){
              pair.first = 21;
              pair.second = 1;
              ingredientList.push(pair); //add a coffee ice cream
            }
            else{
              pair.first = 20;
              pair.second = 1;
              ingredientList.push(pair); //add a strawberru ice cream
            }
          }
          else if(element.name === "x") {
            if(element.quantity === -1){
              pair.first = 24;
              pair.second = 1;
              ingredientList.push(pair); //add a buffalo sauce
            }
            else if(element.quantity === 0){
              pair.first = 25;
              pair.second = 1;
              ingredientList.push(pair); //add a BBQ sauce
            }
            else if(element.quantity === 1){
              pair.first = 26;
              pair.second = 1;
              ingredientList.push(pair); //add a Honey mustard sauce
            }
            else if(element.quantity === 2){
              pair.first = 27;
              pair.second = 1;
              ingredientList.push(pair); //add a ranch sauce
            }
            else if(element.quantity === 3){
              pair.first = 28;
              pair.second = 1;
              ingredientList.push(pair); //add a spicy ranch sauce
            }
            else if(element.quantity === 4){
              pair.first = 4;
              pair.second = 1;
              ingredientList.push(pair); //add a gig em sauce
            }
          }
          else {
            if(element.quantity === -1){
              ingredientList.push(pair); //push item with quanity -1
            }
            else{
              cost += element.price;
              ingredientList.push(pair); //push item with given quanity
            }
          }
        }
    };

    addToCartPromise = addToCartPromise.then(async () => {
      const response = await fetch(`http://localhost:3001/createOrder/${menuItems}/${ingredientList}${cost}`, {
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
  return items;
}


export {GetMenuList, GetIngredients, AddToCart, GetCartItems, GetInventoryList};
