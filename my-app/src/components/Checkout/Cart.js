import React, {useEffect, useState} from "react";
import CartItem from "./CartItem";
import './cart.css'
import { Button } from "../Button";

function Cart({ initialItems }) {
  //console.log("II: " + JSON.stringify(initialItems));
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  //console.log("Items: " + items);

  const updateQty = (id, newQty) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, qty: newQty };
      }
      return item;
    });
    setItems(newItems);
  };

  const total = items
    .reduce((total, item) => total + item.price * item.qty, 0)
    .toFixed(2);

  return (
    <div className="Cart">
      <h1 className="Cart-title">Shopping Cart</h1>
      <div className="Cart-itemList">
        {items.map((item) => (
          <CartItem key={item.id} updateQty={updateQty} {...item} />
        ))}
      </div>
      <h2 className="Cart-total">Total: {total}</h2>
      <Button className = 'btn--cart' buttonStyle={'btn--primary'} buttonSize={'btn--large'}>Checkout</Button>
    </div>
  );
}

export default Cart;
