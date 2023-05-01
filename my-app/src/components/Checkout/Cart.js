import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import './cart.css'
import {CreateOrderVectors, CreateOrder, UpdateCartQuantity} from '../pages/databaseFunctions'
import { Button } from "../Button";
import { Link } from 'react-router-dom';
import SimilarItems from "./SimilarItems";
import Popup from "../Popups/Popup";

function Cart({ initialItems }) {
  const [showPopup, setShowPopup] = useState(false);
  console.log("Init items: ", initialItems);

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

  const updateQty = (id, newQty) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, qty: newQty };
      }
      return item;
    });
    setItems(newItems);
    UpdateCartQuantity(id, newQty);
  };

  const total = items
    .reduce((total, item) => total + item.price * item.qty, 0)
    .toFixed(2);

    function removeFromCart(id) {
      UpdateCartQuantity(id, 0);
      localStorage.setItem("checkout", "true");
      setTimeout(function () {
        if (window.location.pathname === "/checkout") {
          window.location.reload();
        }
      }, 1000);
    }

    function cartTotalQty() {
      const totalQty = items.reduce((accumulator, item) => accumulator + item.qty, 0);
      console.log("Q:", totalQty);
      return totalQty;
    }

  return (
    <div className='check'>
      <div className="Cart1">
        <h1 className="Cart-title">Shopping Cart</h1>
        {!items ||items.length === 0 ? (
          <div className="cart-empty">
            <i className="fa fa-shopping-cart"></i>
            <div className="cart-empty-text">Your Cart Is Empty </div>
          </div>
        ) : (
          <>
            <div className="Cart-itemList">
              {items.map((item) =>
                  <CartItem
                    btn={<button className="delete" onClick={() => { removeFromCart(item.id); }}><i className="fa fa-trash-alt"></i></button>}
                    key={item.id}
                    updateQty={updateQty}
                    {...item}
                  />
              )}
            </div>
            <SimilarItems key="similar-items" />
          </>
        )}
      </div>
      <div className="Cart2">
        <h1 className="Cart-title">Order Summary</h1>
        {items && items.length > 0 ? (
          <>
            <div className="items-count">Total items in cart: {cartTotalQty()}</div>
            <div className="price">Total: ${total}</div>
            <Button className='btn--Total' buttonStyle={'btn--third'} onClick={() => handleClose()}><i className="fa fa-trash-alt mr-2"></i><span> Empty Cart</span></Button>
            <Button className='btn--Total' buttonStyle={'btn--primary'} buttonSize={'btn--large'} onClick={() => { checkoutClick(); }}>Checkout</Button>
          </>
        ) : null}
        {showPopup &&
          <Popup popupStyle="style3" onClose={handleClose}/>
        }
      </div>
    </div>
  );
}

export default Cart;
