import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import './cart.css'
import {CreateOrderVectors, CreateOrder} from '../pages/databaseFunctions'
import { Button } from "../Button";
import { Link } from 'react-router-dom';
import SimilarItems from "./SimilarItems";
import Popup from "../Popups/Popup";

function Cart({ initialItems }) {
  const [showPopup, setShowPopup] = useState(false);

  async function checkoutClick() {
    //PLACE ORDER!
    const [menuItems, ingredientList, cost] = await CreateOrderVectors();
    // console.log(menuItems);
    // console.log(ingredientList);
    // console.log(cost);
    await CreateOrder(menuItems, ingredientList, cost);
    // console.log("orderC");
    setShowPopup(true);
  }

  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const handleClose = () => {
    setShowPopup(false);
    window.location.reload();
  }

  // const updateQty = (id, newQty) => {
  //   const newItems = items.map((item) => {
  //     if (item.id === id) {
  //       return { ...item, qty: newQty };
  //     }
  //     return item;
  //   });
  //   setItems(newItems);
  //   const prevCart = items; 
  //   localStorage.setItem("checkout", "true");
  //   setShowPopup(false);
  //   window.location.reload();
  //   CreateOrder(prevCart);
  // };

  const updateQty = (id, newQty) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, qty: newQty };
      }
      return item;
    });
    setItems(newItems);
    const prevCart = items; 
    localStorage.setItem("prevCart", JSON.stringify(prevCart)); // copy prevCart to local storage
    localStorage.clear(); // clear cache
    setShowPopup(false);
    window.location.reload(true); // refresh the page with cache cleared
    CreateOrder(prevCart); // call CreateOrder with prevCart as parameter
  };  

  const total = items
  ? items.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2)
  : "0.00";

  const cartTotalQty = items ? items.reduce((cartTotalQty, item) => cartTotalQty + item.qty, 0) : 0;

  // removes individual items from cart
  async function removeFromCart(i) {
    updateQty(i, 0);
    // setItems(prevCart => {
    //   console.log(prevCart);
    //   console.log(prevCart[0]);
    //   // remove it from previous class
    //   prevCart.filter((item) => {
    //     return item.id !== i;
    //   })
    //   console.log(prevCart);
      //clear cart and then create a new cart without that 
      // CreateOrder(prevCart);
      // localStorage.setItem("checkout", "true");
      // setShowPopup(false);
      // window.location.reload();
      // items = CreateOrder(prevCart);
    // });
    // items;
  };

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
            <div className="items-count">Total tems in Cart: {cartTotalQty}</div>
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
