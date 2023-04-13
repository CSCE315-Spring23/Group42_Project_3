
import React, { useState } from "react";
// import CartApp from '../Checkout/cart'

// import React from "react";
import Cart from "../Checkout/Cart";
import Navbar from "../CustomerNavbar";
import Footer from "../Footer";

const items = [
  { id: 1, name: "Treats", price: 4.99, qty: 5 },
  { id: 2, name: "Catnip", price: 1.49, qty: 3 },
  { id: 3, name: "Bed", price: 14.99, qty: 1 },
  { id: 3, name: "Bed", price: 14.99, qty: 1 }
];

function CartApp() {
  return (
    <>
      <Navbar/>
      <Cart initialItems={items} />
      <Footer />
    </>
  );
}

export default CartApp;

