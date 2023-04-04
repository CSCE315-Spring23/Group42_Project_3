//import React from 'react';
import Footer from '../Footer';
import CardList from '../CardList';
//import React, { useState, useEffect } from 'react';
import {GetBurgerList, GetIngredients} from './databaseFunctions'
//import axios from 'axios';
import Navbar from '../CustomerNavbar';


function Burgers() {
  var menuItems = GetBurgerList();

  // const ingredientsArr = [];
  // var ingredientList = GetIngredients(1);
  // if (ingredientList.length === 0) {
  //   return <div>Loading...</div>;
  // }
  // ingredientsArr.push(ingredientList);
  //
  // var ingredientList2 = GetIngredients(1);
  // if (ingredientList2.length === 0) {
  //   return <div>Loading...</div>;
  // }
  // ingredientsArr.push(ingredientList2);
  //
  // var ingredientList3 = GetIngredients(1);
  // if (ingredientList3.length === 0) {
  //   return <div>Loading...</div>;
  // }
  // ingredientsArr.push(ingredientList3);
  // var ingredientList4 = GetIngredients(1);
  // if (ingredientList4.length === 0) {
  //   return <div>Loading...</div>;
  // }
  // ingredientsArr.push(ingredientList4);
  var ingredientsArr = GetIngredients();

  if (menuItems.length === 0) {
    return <div>Loading...</div>;
  }

  const cardData = {
    cards: []
  };

  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    const card = {
      image: "images/burger-img-1.jpg",
      text: item.menu_item_name,
      //label: "Label 1",
      //path: "",
      ingredients: ingredientsArr[i]
    };
    cardData.cards.push(card);
  }

    return (<>
    <Navbar />
    <div id="menu">
        <CardList cardData={cardData} title="BURGERS" />
    </div>

      <Footer/>
    </>);
  }

  export default Burgers;
