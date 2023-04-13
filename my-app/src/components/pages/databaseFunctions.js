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

function AddToCart(type, name, quantity) {
  var myID = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*=\s*([^;]*).*$)|^.*$/, "$1");
  console.log("Adding " +quantity + " units of "+ type + ": " + name+ " to cart for user " + myID);
}



export {GetMenuList, GetIngredients, AddToCart};
