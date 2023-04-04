import { useState, useEffect } from 'react';

function GetBurgerList(){
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    async function fetchMenuItems() {
      const response = await fetch('http://localhost:3001/burgerRequest');
      const data = await response.json();
      data.sort((a, b) => a.menu_id - b.menu_id);
      setMenuItems(data);
    }

    fetchMenuItems();
  }, []);

  return menuItems;
}

function GetIngredients() {
   const [ingredientArr, setIngredientArr] = useState([]);

  useEffect(() => {
    async function fetchIngredients() {
      const response = await fetch('http://localhost:3001/getInventoryItemsForMenu');
      const data = await response.json();
      //data.sort((a, b) => a.menu_id - b.menu_id);
      setIngredientArr(data);
    }

    fetchIngredients();
  }, []);

  return ingredientArr;
}

export {GetBurgerList, GetIngredients};
