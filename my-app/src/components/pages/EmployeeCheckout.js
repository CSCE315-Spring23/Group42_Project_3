
import { GetCartItems } from "../pages/databaseFunctions";
import React, { useState, useEffect } from 'react';
import Cart from "../Checkout/Cart";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { buttonText, employeeLinks } from '../NavbarData';

/**

Function that renders the Checkout page
@function
@returns {JSX.Element} - Checkout page component JSX elements
*/
function Checkout() {
  /**
   *
   * Stateful value for cart item list
   * @type {Array<Object>}
   */
  const [list, setList] = useState([]);
  /**
  
  Fetches cart items from the database and updates list state
  @function
  */
  useEffect(() => {
    setList(GetCartItems());
  }, []);
  return (
    <>
      <Navbar type='e' links={employeeLinks} buttonText={buttonText} buttonPath='/EmployeeCheckout' />
      <Cart initialItems={list} />
      <Footer />
    </>
  );
}

export default Checkout;