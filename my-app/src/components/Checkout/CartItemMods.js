import React from 'react';
import './cart.css'

/**
 * Renders the modifications of an item in the cart.
 * @param {Object} props - The props that are passed to the component.
 * @param {number} props.id - The ID of the item in the cart.
 * @param {string} props.name - The name of the item in the cart.
 * @param {number} props.price - The price of the item in the cart.
 * @param {number} props.qty - The quantity of the item in the cart.
 * @param {string[]} props.mods - An array of modifications for the item in the cart.
 * @returns {JSX.Element} - The JSX code that renders the modifications of the item.
 */
function CartItemMods({ id, name, price, qty, mods }) {
  return (
    <div className="CartItemMods">
      <div>
        {mods && mods.map((mod, index) => (
          <div key={index}>{mod}</div>
        ))}
      </div>
    </div>
  );
}

export default CartItemMods;
