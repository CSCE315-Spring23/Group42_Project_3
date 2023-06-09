import React, { useState } from 'react';
import { Button } from '../Button';
import { AddToCart } from '../pages/databaseFunctions';
import { IngredientForm } from '../IngredientForm';
import {Login} from './Login'
import { Link } from 'react-router-dom';
import './Popup.css';

/**
  * Popup component that displays a pop-up window with ingredient form, add to cart button, and checkout button.
  * @param {Object} props - The props that are passed to this component.
  * @param {string} props.text - The text to be displayed in the popup window.
  * @param {Array<string>} props.ingredients - The list of ingredients to be displayed in the ingredient form.
  * @param {function} props.onClose - The function to be called when the popup window is closed.
  * @param {number} props.price - The price of the item.
  * @param {string} props.popupStyle - The style of the popup window.
  * @returns {JSX.Element} - Returns a JSX element that displays the popup window.
*/

function Popup({ text, ingredients, onClose, price, popupStyle = 'style1'}) {
  const [quantities, setQuantities] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const ingredientsToHide = ["Tray Paper", "Black Bean Patty", "Buns", "Small Paper Containers", "Sauce Containers", "Strawberry Ice Cream", "Straws", "Cups", "Chocolate Ice Cream", "Coffee Ice Cream", "Drink Lids", "Milk", "Chocolate Chunk Cookie", "Chocolate Fudge Brownie", "Fountain Drink Syrup", "Coffee", "Fries", "Tater Tots", "Onion Rings", "Kettle Chips", "Chicken Tenders", "Steak Fingers", "Seasonal"];
  const visibleIngredients = ingredients ? ingredients.filter((ingredient) => !ingredientsToHide.includes(ingredient)) : [];

  /**
  * Function to add all ingredients to cart.
  * @async
  */
  async function addAllToCart() {
    for (let i = 0; i < visibleIngredients.length; i++) {
      if (quantities[i] !== 0 || visibleIngredients[i] === "Vanilla Ice Cream" || visibleIngredients[i] === "x" || visibleIngredients[i] === "Combo" || visibleIngredients[i] === "Basket Combo") {
        await AddToCart("mod", visibleIngredients[i], quantities[i], 0);
      }
    }
    await AddToCart("item", text, 1, price);
  }

  /**
  * Function to handle checkout button click.
  * @async
  */
  async function checkoutClick() {
    await addAllToCart();
    localStorage.setItem("checkout", "true");
    setTimeout(function () {
      if (window.location.pathname === "/checkout") {
        window.location.reload();
      }
    }, 1000);
  }

  const STYLES = ['style1', 'style2', 'style3'];
  const checkPopupStyle = STYLES.includes(popupStyle) ? popupStyle : STYLES[0];

  return (
    <div className='popup'>
      <div className='popup-content'>
      {checkPopupStyle === "style1" && (
        <>
            <p>{text} </p>
            <IngredientForm ingredients={visibleIngredients} setQuantities={setQuantities}></IngredientForm>
            <div className='bottomBar'>
            <Button className="close" buttonStyle='btn--outline' onClick={onClose}>X</Button>
            <Button className="cart" buttonStyle="btn--outline" onClick={async () => { await checkoutClick(); onClose(); }}>ADD TO CART</Button>
            </div>
        </>
      )}
      {checkPopupStyle === "style2" && (
        <Login />
      )}
      {checkPopupStyle === "style3" && (
        <>
          <h2>Order Placed</h2>
          <Button onClick={onClose}><Link to='/'  style={{ color: 'white', textDecoration: 'none', position: 'absolute'}} /> Start Over
          {/* Start Over */}
          </Button>
        </>
      )}
      </div>
    </div>
  );
}

export default Popup;
