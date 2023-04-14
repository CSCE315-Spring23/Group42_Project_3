import React from 'react';
import CartItemMods from "./CartItemMods";
import './cart.css'

function CartItem({ id, name, price, qty, updateQty, mods }) {
  const addOne = () => updateQty(id, qty + 1);
  const subOne = () => updateQty(id, qty - 1);
  //const mods = ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"];

  return (
    <div className="InfoRow">
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
      <div className="ModRow">
      <CartItemMods id={id} name={name} price={price} qty={qty} mods={mods} />
      </div>
    </div>
  );
}

export default CartItem;
