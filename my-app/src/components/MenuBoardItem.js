import React from 'react';

//Show Item in out Menu Display Board with price
const MenuBoardItem = ({ name, price }) => {
  return (
    <li>
      {name} - ${price}
    </li>
  );
};

export default MenuBoardItem;
