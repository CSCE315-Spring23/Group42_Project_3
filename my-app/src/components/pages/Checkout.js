//import React, { useState } from "react";
import {GetCartItems} from "../pages/databaseFunctions";

// import React from "react";
import Cart from "../Checkout/Cart";
import Navbar from "../CustomerNavbar";
import Footer from "../Footer"; 

// const old = [
//   { id: 1, name: "Treats", price: 4.99, qty: 5 },
//   { id: 2, name: "Catnip", price: 1.49, qty: 3 },
//   { id: 3, name: "Bed", price: 14.99, qty: 1 },
//   { id: 4, name: "asdkjfhakjd", price: 14.99, qty: 1 }
// ];

function CartApp() {
  const list = GetCartItems();

  return (
    <>
      <Navbar/>
      <Cart initialItems={list} />
      <Footer />
    </>
  );
}

export default CartApp;

