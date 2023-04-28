import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import {CreateOrderVectors, CreateOrder} from '../pages/databaseFunctions'
import './cart.css'
import { Button } from "../Button";
import { Link } from 'react-router-dom';
import SimilarItems from "./SimilarItems";

function Cart({ initialItems }) {
  const [showPopup, setShowPopup] = useState(false);

  async function checkoutClick() {
    //PLACE ORDER!
    const [menuItems, ingredientList, cost] = await CreateOrderVectors();
    console.log(menuItems);
    console.log(ingredientList);
    console.log(cost);
    await CreateOrder(menuItems, ingredientList, cost);
    console.log("orderC");
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
    <div className= 'check'>
      <div className="Cart1">
        <h1 className="Cart-title">Shopping Cart</h1>
        <div className="Cart-itemList">
          {items.map((item) => (
            <CartItem key={item.id} updateQty={updateQty} {...item} />
          ))}
        </div>
        {items.length > 0 && <SimilarItems />}
      </div>
      <div className="Cart2">
        <h1 className="Cart-title">Order Summary</h1>
        <div className="price">Total: ${total}</div>
        <Button className='btn--Total' buttonStyle={'btn--primary'} buttonSize={'btn--large'} onClick={() => { checkoutClick(); }}>Checkout</Button>
        {showPopup &&
          <div className="popup">
            <div className="popup-content">
              <h2>Order Placed</h2>
              <p className="Totaltext">''</p>
              <Button onClick={handleClose}><Link to='/'  style={{ color: 'white', textDecoration: 'none', position: 'absolute'}}>
              Start Over
              </Link></Button>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default Cart;
