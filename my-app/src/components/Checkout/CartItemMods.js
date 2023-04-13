import React from 'react';

import './cart.css'

function CartItemMods({ id, name, price, qty}) {
  //const addOne = () => updateQty(id, qty + 1);
  //const subOne = () => updateQty(id, qty - 1);
  const mods = ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"];

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
