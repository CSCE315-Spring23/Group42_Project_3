import React from 'react';
import Footer from '../Footer';
import {GetMenuList, GetIngredients} from './databaseFunctions';
import EmployeeCardList from '../EmployeeCardList';
import { Button } from '../Button';
import Navbar from '../Navbar';
import { employeeLinks, buttonText } from '../NavbarData';
import Loading from '../Loading';

/**
 * Renders Employee View with features not visible for customers
 * @returns {JSX.Element} - Returns the JSX of the component
 * @constructor
 */
function EmployeeView() {
  /**
   * Get list of menu items and ingredients
   * Display loading screen if either list is empty
   */
  var menuItems = GetMenuList(0, 0);
  var ingredientsArr = GetIngredients(1, menuItems.length);

  if (menuItems.length === 0 || ingredientsArr.length === 0) {
    return <Loading />;
  }

  /**
   * Array of cards to be displayed in the EmployeeCardList component
   * @type {{cards: []}}
   */
  const cardData = {
    cards: []
  };

  /**
   * Create card object for each menu item
   */
  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    const ingr = ingredientsArr[i];

    /**
     * Add "Combo" ingredient to items that don't already have it
     */
    if (!ingr.includes("Combo") && (i <= 4 || (i > 6 && i <= 10))) {
      ingr.push("Combo");
    }

    /**
     * Add "Basket Combo" ingredient to items that don't already have it
     */
    if (!ingr.includes("Basket Combo") && i > 4 && i <= 6) {
      ingr.push("Basket Combo");
    }

    /**
     * Card object for the menu item
     * @type {{text: *, label: *, ingredients: *}}
     */
    const card = {
      // image: "images/sandwich-img-1.jpg",
      text: item.menu_item_name,
      label: item.menu_item_cost,
      //path: "",
      ingredients: ingr
    };
    
    //console.log("Menu items in cards: " + menuItems[i].menu_item_name);
    console.log("Ingredients in cards: " + ingredientsArr[i]);
    cardData.cards.push(card);
  }

  return (
    <>
      <Navbar type='e' links={employeeLinks} buttonText={buttonText} buttonPath='/EmployeeCheckout' />
      <div id="employeemenu">
        <EmployeeCardList cardData={cardData} title="Employee View" />
      </div>

      {/* <button>Checkout</button> */}
      {/* <Button text = "Checkout" buttonStyle={"btn--primary"}/> */}
      <Footer />
    </>
  );
}

export default EmployeeView;
