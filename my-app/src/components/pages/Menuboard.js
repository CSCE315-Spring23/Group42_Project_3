import React, { useState } from 'react';
import View from '../MenuBoard/View';
import { GetMenuList, GetIngredients } from './databaseFunctions';
import Loading from '../Loading';

/**
 * Displays all sandwich types for customers to choose from.
 * @function
 * @returns {JSX.Element} The component to render.
 */
const MenuBoard = () => {
  // Retrieve menu items and ingredients from database
  var menuItems = GetMenuList(1, 60);
  var ingredientsArr = GetIngredients(1, 26);

  // Array of ingredients to hide
  const ingredientsToHide = ["Tray Paper", "Black Bean Patty", "Straws", "Cups", "Fountain Drink Syrup", "Drink Lids"];

  // If either menuItems or ingredientsArr is empty, display loading screen
  if (menuItems.length === 0 || ingredientsArr.length === 0) {
    return <Loading />;
  }

  // Generate arrays of cards for each menu category
  const burgersArr = [];
  for (let i = 0; i < 4; i++) {
    const item = menuItems[i];
    const card = {
      name: item.menu_item_name,
      price: item.menu_item_cost,
      ingredients: ingredientsArr[i].filter((ingredient) => !ingredientsToHide.includes(ingredient)),
    };
    burgersArr.push(card);
  }

  const basketsArr = [];
  for (let i = 4; i < 7; i++) {
    const item = menuItems[i];
    const card = {
      name: item.menu_item_name,
      price: item.menu_item_cost,
      ingredients: ingredientsArr[i].filter((ingredient) => !ingredientsToHide.includes(ingredient)),
    };
    basketsArr.push(card);
  }

  const sandwichesArr = [];
  for (let i = 7; i < 10; i++) {
    const item = menuItems[i];
    const card = {
      name: item.menu_item_name,
      price: item.menu_item_cost,
      ingredients: ingredientsArr[i].filter((ingredient) => !ingredientsToHide.includes(ingredient)),
    };
    sandwichesArr.push(card);
  }

  const sidesArr = [];
  for (let i = 12; i < 25; i++) {
    const item = menuItems[i];
    const card = {
      name: item.menu_item_name,
      price: item.menu_item_cost,
      ingredients: [],
    };
    sidesArr.push(card);
  }

  const seasonalArr = [];
  for (let i = 26; i < 60; i++) {
    const item = menuItems[i];
    if (item) {
      const card = {
        name: item.menu_item_name,
        price: item.menu_item_cost,
        ingredients: [],
      };
      seasonalArr.push(card);
    }
  }

  // Return the View component with the generated arrays of cards for each menu category
  return <View burgers={burgersArr} baskets={basketsArr} sandwiches={sandwichesArr} sides={sidesArr} seasonal={seasonalArr} />;
};

export default MenuBoard;
