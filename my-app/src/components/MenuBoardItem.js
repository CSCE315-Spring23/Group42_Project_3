import React from 'react';

const MenuBoardItem = ({ name, price }) => {
  return (
    <li>
      {name} - ${price}
    </li>
  );
};

export default MenuBoardItem;
