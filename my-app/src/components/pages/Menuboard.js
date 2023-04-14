import React, { useState } from 'react';
import View from '../MenuBoard/View';
import {GetMenuList, GetIngredients} from './databaseFunctions'
import Loading from '../Loading';

{/*
* Displays all sandwich types for customers to choose from
* @author: 
*/ }

const MenuBoard = () => {
  var menuItems = GetMenuList(1, 26);
  const ingredientsToHide = ["Tray Paper", "Black Bean Patty", "Straws", "Cups", "Fountain Drink Syrup", "Drink Lids"];
  var ingredientsArr = GetIngredients(1, 26);
  // var ingredientsArr = GetIngredients(1, 26);

  if (menuItems.length === 0 | ingredientsArr.length === 0) {
    return <Loading />;
  }
  
  const burgersArr = [];
  for (let i = 0; i < 4; i++) {
    const item = menuItems[i];
    const card = {
      name: item.menu_item_name,
      price: item.menu_item_cost,
      ingredients: ingredientsArr[i].filter((ingredient) => !ingredientsToHide.includes(ingredient))
    };
    burgersArr.push(card);
  }
  
  const basketsArr = [];
  for (let i = 4; i < 6; i++) {
    const item = menuItems[i];
    const card = {
      name: item.menu_item_name,
      price: item.menu_item_cost,
      ingredients: ingredientsArr[i].filter((ingredient) => !ingredientsToHide.includes(ingredient))
    };
    basketsArr.push(card);
  }

  const sandwichesArr = [];
  for (let i = 7; i < 12; i++) {
    const item = menuItems[i];
    const card = {
      name: item.menu_item_name,
      price: item.menu_item_cost,
      ingredients: ingredientsArr[i].filter((ingredient) => !ingredientsToHide.includes(ingredient))
    };
    sandwichesArr.push(card);
  }

  const sidesArr = [];
  for (let i = 12; i < 25; i++) {
    const item = menuItems[i];
    const card = {
      name: item.menu_item_name,
      price: item.menu_item_cost,
      ingredients: []
    };
    sidesArr.push(card);
  }

  //silverware is 25 but seasonal is not working
  const seasonalArr = [];
  for (let i = 25; i < 25; i++) {
    const item = menuItems[i];
    const card = {
      name: item.menu_item_name,
      price: item.menu_item_cost,
      ingredients: []
    };
    seasonalArr.push(card);
  }

  {/* HTML structure*/ }
  return (
    <View burgers={burgersArr} baskets={basketsArr} sandwiches={sandwichesArr} sides = {sidesArr} seasonal= {seasonalArr} />
  );
};

export default MenuBoard;

