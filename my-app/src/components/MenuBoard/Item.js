import React from 'react';
import './Item.css';

// Show Item in our Menu Display Board with price
const Item = ({ name, price, ingredients }) => {
  return (
    <li>
      <span className="item">{name} - ${price}</span>
      <div className="ingredients">{ingredients.join(', ')}</div>
    </li>
  );
};

export default Item;
