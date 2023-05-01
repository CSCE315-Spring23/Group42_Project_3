//import React, { useState } from "react";
import {GetCartItems} from "../pages/databaseFunctions";
import React, { useState, useEffect } from 'react';
// import React from "react";
import Cart from "../Checkout/Cart";
import Navbar from "../Navbar";
// import EmployeeNavbar from "../EmployeeNavbar";
import Footer from "../Footer";
import { menuLinks, buttonText, buttonPath } from '../NavbarData';

function Checkout() {
  const list = GetCartItems();
  // localStorage.setItem('isEmployee', false);
  const isEmployee = localStorage.getItem('isEmployee') === 'true';
  

  return (
    <>
      {!isEmployee && <Navbar id = "CustomerNavbar" links={menuLinks} buttonText={buttonText} buttonPath={buttonPath} />}
      {isEmployee && <Navbar ID = "EmployeeNavbar" links={employeeLinks} buttonText={buttonText} buttonPath={buttonPath} />}
      
      <Cart initialItems={list} />
      <Footer />
    </>
  );
}

export default Checkout;
