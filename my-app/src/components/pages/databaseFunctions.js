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

let addToCartPromise = Promise.resolve();

function AddToCart(type, name, quantity) {
  const myID = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/, "$1");
  console.log("Adding " +quantity + " units of "+ type + ": " + name+ " to cart for user " + myID);
  const item = { type, name, quantity };

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
  var myID = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/, "$1");
  console.log("getting cart");
  async function fetchCart(myID) {
    const response = await fetch(`http://localhost:3001/getCart/${myID}`);
    const data = await response.json();
    return data.rows[0].orderlist;
  }
  async function parseCart() {
    const myCart = await fetchCart(myID);
    //const myCart = JSON.parse(rawCart);
    console.log(myCart); // should log an array of cart items
    myCart.forEach((rawItem) => {
      const item = JSON.parse(rawItem);
      console.log(item.type);
    });
  }
  
  parseCart();
}


export {GetMenuList, GetIngredients, AddToCart, GetCartItems};
