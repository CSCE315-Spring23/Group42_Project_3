import React from 'react';
import CartItemMods from "./CartItemMods";
import './cart.css'

function CartItem({ btn, id, name, price, qty, updateQty, mods }) {
  const addOne = () => updateQty(id, qty + 1);
  const subOne = () => updateQty(id, qty - 1);
  var normalPrice = price;
  if(mods.indexOf("Fries Combo (+$1.90)") !== -1) {
    normalPrice -= 1.9;
  }
  if(mods.indexOf("Chips Combo (+$1.90)") !== -1) {
    normalPrice -= 1.9;
  }
  if(mods.indexOf("Drink Combo (+$1.10)") !== -1) {
    normalPrice -= 1.1;
  }

  //const mods = ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"];

  return (
    <div className="InfoRow">
      <div className="CartItem">
        {/* <div>({id})</div> */}
        {btn}
        <div className='item-name'>{name}<CartItemMods id={id} name={name} price={price} qty={qty} mods={mods} /></div>
        <div>${normalPrice.toFixed(2)}</div>
        <div>
          <button className='change-quantity' onClick={subOne} disabled={qty <= 1}>-</button>
          {qty}
          <button className='change-quantity' onClick={addOne}>+</button>
        </div>
        <div> ${(qty * price).toFixed(2)}</div>
      </div>
      <div className="ModRow">
      
      </div>
    </div>
  );
}

export default CartItem;
