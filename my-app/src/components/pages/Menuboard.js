import React, { useState } from 'react';
import MenuBoardItem from '../MenuBoardItem';
import Navbar from '../CustomerNavbar';

const MenuBoard = () => {
  const [menuItems, setMenuItems] = useState([
    {
      name: 'Hamburger',
      price: 5.99,
    },
    {
      name: 'Cheeseburger',
      price: 6.49,
    },
    {
      name: 'French Fries',
      price: 2.99,
    },
    {
      name: 'Onion Rings',
      price: 3.99,
    },
    {
      name: 'Soft Drink',
      price: 1.99,
    },
    {
      name: 'Milkshake',
      price: 4.99,
    },
  ]);

  return (
    <div style={{ backgroundColor: "rgb(106,91,92)"}}>
    <img src = 'images/Revs-logo.png' alt = "Rev's American Grill"></img>
      <h1>Menu Board</h1>
      <ul>
        {menuItems.map((item) => (
          <MenuBoardItem key={item.name} name={item.name} price={item.price} />
        ))}
      </ul>
    </div>
  );
};

export default MenuBoard;