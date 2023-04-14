import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import './cart.css'
import { Button } from "../Button";
import { Link } from 'react-router-dom';

function Cart({ initialItems }) {
  const [showPopup, setShowPopup] = useState(false);
  //console.log("II: " + JSON.stringify(initialItems));
  function checkoutClick() {
    //PLACE ORDER!
    setShowPopup(true);
  }

  const handleClose = () => {
   setShowPopup(false);
   window.location.reload();
   
 }

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
      <Button className='btn--cart' buttonStyle={'btn--primary'} buttonSize={'btn--large'} onClick={() => { checkoutClick(); }}>Checkout</Button>
      {showPopup &&
        <div className="popup">
          <div className="popup-content">
            <h2>Order Placed</h2>
            <p className="carttext">''</p>
            <Button onClick={handleClose}><Link to='/Menu'>
            Menu
            </Link></Button>
          </div>
        </div>
      }
    </div>
  );
}

export default Cart;
