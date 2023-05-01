import React from 'react';
import './Item.css';

/**
  * @component Each menu item used in menu board
  * @description Renders a menu item with its name, price and ingredients.
  * @param {object} props - The props object containing name, price and ingredients.
  * @returns {JSX.Element} - Rendered component
*/
const Item = ({ name, price, ingredients }) => {
  return (
    <li>
      <span className="item">{name} - ${price}</span>
      <div className="ingredients">{ingredients.join(', ')}</div>
    </li>
  );
};

export default Item;
