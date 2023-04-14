import React from 'react';

import './cart.css'

function CartItemMods({ id, name, price, qty, mods}) {
  //const addOne = () => updateQty(id, qty + 1);
  //const subOne = () => updateQty(id, qty - 1);
  //const mods = ["NO bun", "SUB lamb patty"];

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
