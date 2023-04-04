import { useState, useEffect } from 'react';

function GetMenuList(start, end){
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    async function fetchMenuItems() {
      const response = await fetch(`http://localhost:3001/menuRequest/${start}/${end}`);
      const data = await response.json();
      setMenuItems(data);
    }

    fetchMenuItems();
  }, []);

  return menuItems;
}

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
  }, []);

  return ingredientArr;
}

export {GetMenuList, GetIngredients};
