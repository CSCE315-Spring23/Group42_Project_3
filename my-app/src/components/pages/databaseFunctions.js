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
  const [myCart, setCart] = useState([]);
  var myID = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/, "$1");
  console.log("getting cart");
  
  useEffect(() => {
    async function fetchCart() {
      const response = await fetch(`http://localhost:3001/getCart/${myID}`);
      const data = await response.json();
      setCart(data.rows[0].orderlist);
      console.log("cart in func: " + data.rows[0].orderlist);
    }
    fetchCart();
  }, [myID]);
  
  console.log("cart: " + myCart); // should log an array of cart items
  const items = [];
  if(myCart !== null) {
    for (let i = 0; i < myCart.length; i++) {
      const element = JSON.parse(myCart[i]);
      //console.log(element);
      const item = { id: i+1, name: element.name, price: 4.99, qty: 1}
      items.push(item);
    };
  }
  return items;
  
  // const old = [
  //   { id: 1, name: "Treats", price: 4.99, qty: 5 },
  //   { id: 2, name: "Catnip", price: 1.49, qty: 3 },
  //   { id: 3, name: "Bed", price: 14.99, qty: 1 },
  //   { id: 4, name: "asdkjfhakjd", price: 14.99, qty: 1 }
  // ];
  // return old;
}


export {GetMenuList, GetIngredients, AddToCart, GetCartItems};
