import React from 'react';

import './cart.css'

function CartItem({ id, name, price, qty, updateQty }) {
  const addOne = () => updateQty(id, qty + 1);
  const subOne = () => updateQty(id, qty - 1);

  return (
    <div className="CartItem">
      <div>({id})</div>
      <div>{name}</div>
      <div>${price}</div>
      <div>
        <button onClick={subOne} disabled={qty <= 0}>
          -
        </button>
        {qty}
        <button onClick={addOne}>+</button>
      </div>
      <div> ${(qty * price).toFixed(2)}</div>
    </div>
  );
}

export default CartItem;

