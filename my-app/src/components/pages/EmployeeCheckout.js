import {GetCartItems} from "../pages/databaseFunctions";
import React, { useState, useEffect } from 'react';
import Cart from "../Checkout/Cart";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { buttonText, employeeLinks } from '../NavbarData';

function Checkout() {
  const list = GetCartItems();
  
  return (
    <>
      <Navbar type = 'e' links={employeeLinks} buttonText={buttonText} buttonPath= '/EmployeeCheckout'/>
      <Cart initialItems={list} />
      <Footer />
    </>
  );
}

export default Checkout;