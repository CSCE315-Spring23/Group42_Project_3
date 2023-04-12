import React, { useState } from 'react';
import Navbar from '../CustomerNavbar';
import View from '../MenuBoard/View';
import {GetMenuList, GetIngredients} from './databaseFunctions'
import Loading from '../Loading';

{/*
* Displays all sandwich types for customers to choose from
* @author: 
*/ }

const MenuBoard = () => {
  // var menuItems = GetMenuList(1, 20);
  // var ingredientsArr = GetIngredients(1, 20);

  // if (menuItems.length === 0 | ingredientsArr.length === 0) {
  //   return <Loading></Loading>;
  // }
  const [menuItems, setMenuItems] = React.useState([]);
  const [ingredientsArr, setIngredientsArr] = React.useState([]);

  React.useEffect(() => {
    const fetchMenuItems = async () => {
      const items = await GetMenuList(1, 20);
      setMenuItems(items);
    };

    const fetchIngredients = async () => {
      const ingredients = await GetIngredients(1, 20);
      setIngredientsArr(ingredients);
    };

    fetchMenuItems();
    fetchIngredients();
  }, []);

  if (menuItems.length === 0 || ingredientsArr.length === 0) {
    return <Loading />;
  }
  
  const burgersArr = [];
  for (let i = 0; i < 4; i++) {
    const item = menuItems[i];
    const card = {
      name: item.menu_item_name,
      price: 5.99,
      ingredients: ingredientsArr[i]
    };
    burgersArr.push(card);
  }
  
  const basketsArr = [];
  for (let i = 4; i < 7; i++) {
    const item = menuItems[i];
    const card = {
      name: item.menu_item_name,
      price: 5.99,
      ingredients: ingredientsArr[i]
    };
    basketsArr.push(card);
  }

  const sandwichesArr = [];
  for (let i = 8; i < 13; i++) {
    const item = menuItems[i];
    const card = {
      name: item.menu_item_name,
      price: 5.99,
      ingredients: ingredientsArr[i]
    };
    sandwichesArr.push(card);
  }

  const sidesArr = [];
  for (let i = 13; i < 20; i++) {
    const item = menuItems[i];
    const card = {
      name: item.menu_item_name,
      price: 5.99,
      ingredients: ingredientsArr[i]
    };
    sidesArr.push(card);
  }

  {/* HTML structure*/ }
  return (
    <View burgers={burgersArr} baskets={basketsArr} sandwiches={basketsArr} sides = {basketsArr} seasonal= {basketsArr} />
  );
};

export default MenuBoard;

