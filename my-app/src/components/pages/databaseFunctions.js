import { useState, useEffect } from 'react';

function GetBurgerList(){
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    async function fetchMenuItems() {
      const response = await fetch('http://localhost:3001/burgerRequest');
      const data = await response.json();
      setMenuItems(data);
    }

    fetchMenuItems();
  }, []);

  return menuItems;
}

function GetIngredients(id) {
  const [ingredientList, setIngredientList] = useState([]);

  useEffect(() => {
    async function fetchIngredients() {
      const response = await fetch('http://localhost:3001/getInventoryItemsForMenu/' + id);
      const data = await response.json();
      setIngredientList(data);
    }

    fetchIngredients();
  }, [id]);

  return ingredientList;
}

export {GetBurgerList, GetIngredients};
