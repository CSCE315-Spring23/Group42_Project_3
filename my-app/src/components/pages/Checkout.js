//import React, { useState } from "react";
import {GetCartItems} from "../pages/databaseFunctions";
import React, { useState, useEffect } from 'react';

// import React from "react";
import Cart from "../Checkout/Cart";
import Navbar from "../CustomerNavbar";
import EmployeeNavbar from "../EmployeeNavbar";
import Footer from "../Footer";

// const old = [
//   { id: 1, name: "Treats", price: 4.99, qty: 5 },
//   { id: 2, name: "Catnip", price: 1.49, qty: 3 },
//   { id: 3, name: "Bed", price: 14.99, qty: 1 },
//   { id: 4, name: "asdkjfhakjd", price: 14.99, qty: 1 }
// ];

function Checkout() {
  const list = GetCartItems();
  // localStorage.setItem('isEmployee', false);
  const isEmployee = localStorage.getItem('isEmployee') === 'true';
  

  return (
    <>
      {!isEmployee && <Navbar id="CustomerNavbar" />}
      {isEmployee && <EmployeeNavbar id="EmployeeNavbar" />}
      
      <Cart initialItems={list} />
      <Footer />
    </>
  );
}

export default Checkout;
