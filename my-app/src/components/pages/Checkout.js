/**

Retrieves cart items from database and displays checkout page
@module Checkout
*/
import {GetCartItems} from "../pages/databaseFunctions";
import React, { useState, useEffect } from 'react';
import Cart from "../Checkout/Cart";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { menuLinks, buttonText, buttonPath } from '../NavbarData';

/**

Renders the checkout page component
@function Checkout
@returns {JSX.Element} - Checkout component elements
*/
function Checkout() {
  const list = GetCartItems();
  // localStorage.setItem('isEmployee', false);
  const isEmployee = localStorage.getItem('isEmployee') === 'true';
  
  return (
    <>
      <Navbar links={menuLinks} buttonText={buttonText} buttonPath={buttonPath} />
      <Cart initialItems={list} />
      <Footer />
    </>
  );
}

export default Checkout;
