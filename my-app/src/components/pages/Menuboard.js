import React, { useState } from 'react';
import View from '../MenuBoard/View';
import {GetMenuList, GetIngredients} from './databaseFunctions'
import Loading from '../Loading';

{/*
* Displays all sandwich types for customers to choose from
* @author: 
*/ }

const MenuBoard = () => {
  var menuItems = GetMenuList(1, 20);
  var ingredientsArr = GetIngredients(1, 20);

  if (menuItems.length === 0 | ingredientsArr.length === 0) {
    return <Loading />;
  }

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
  for (let i = 8; i < 12; i++) {
    const item = menuItems[i];
    const card = {
      name: item.menu_item_name,
      price: 5.99,
      ingredients: ingredientsArr[i]
    };
    sandwichesArr.push(card);
  }

  const sidesArr = [];
  for (let i = 12; i < 20; i++) {
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
    <View burgers={burgersArr} baskets={basketsArr} sandwiches={sandwichesArr} sides = {sidesArr} seasonal= {[]} />
  );
};

export default MenuBoard;

