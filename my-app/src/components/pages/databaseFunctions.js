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

// function GetMenuList2(){
//   const [menuItems, setMenuItems] = useState([]);
//
//   useEffect(() => {
//     async function fetchMenuItems() {
//       const response = await fetch(`http://localhost:3001/menuRequest2/`);
//       const data = await response.json();
//       setMenuItems(data);
//     }
//
//     fetchMenuItems();
//   }, []);
//
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
          if(element.quantity === -1)
            modlist.push("NO " + element.name);
          else
            modlist.push("EXTRA " + element.name);
      }
    };
  }
  return items;
}


export {GetMenuList, GetIngredients, AddToCart, GetCartItems};
