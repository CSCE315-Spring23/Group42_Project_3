import React, { useState } from 'react';
import Navbar from '../CustomerNavbar';
import View from '../MenuBoard/View';

{/*
* Displays all sandwich types for customers to choose from
* @author: 
*/ }
const MenuBoard = () => {
  const [burgers, setMenuItems] = useState([
    {
      name: 'Hamburger',
      price: 5.99,
      ingredients: ["Patty", "Bun", "lettuce"],
    },
    {
      name: 'Cheeseburger',
      price: 6.49,
      ingredients: ["Patty", "Bun", "cheese", "lettuce"],
    },
  ]);
  const [sides, setSideItems] = useState([
    {
      name: 'French Fries',
      price: 2.99,
      ingredients: ["Patty", "Bun", "lettuce"],
    },
    {
      name: 'Onion Rings',
      price: 3.99,
      ingredients: ["Patty", "Bun", "lettuce"],
    },
  ]);

  {/* HTML structure*/ }
  return (
    <View burgers={burgers} baskets={burgers} sandwiches={burgers} sides = {sides} seasonal={sides} />
  );
};

export default MenuBoard;
