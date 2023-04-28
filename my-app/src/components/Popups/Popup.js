import React, { useState } from 'react';
import { Button } from '../Button';
import { AddToCart } from '../pages/databaseFunctions';
import { IngredientForm } from '../IngredientForm';
import {Login} from './Login'
import './Popup.css';

function Popup({ text, ingredients, onClose, price, popupStyle = 'style1'}) {
  const [quantities, setQuantities] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const ingredientsToHide = ["Tray Paper", "Black Bean Patty", "Buns", "Small Paper Containers", "Sauce Containers", "Strawberry Ice Cream", "Straws", "Cups", "Chocolate Ice Cream", "Coffee Ice Cream", "Drink Lids", "Milk", "Chocolate Chunk Cookie", "Chocolate Fudge Brownie", "Fountain Drink Syrup", "Coffee", "Fries", "Tater Tots", "Onion Rings", "Kettle Chips", "Chicken Tenders", "Steak Fingers", "Seasonal"];
  const visibleIngredients = ingredients ? ingredients.filter((ingredient) => !ingredientsToHide.includes(ingredient)) : [];

  async function addAllToCart() {
    for (let i = 0; i < visibleIngredients.length; i++) {
      if (quantities[i] !== 0 || visibleIngredients[i] === "Vanilla Ice Cream" || visibleIngredients[i] === "x" || visibleIngredients[i] === "Combo" || visibleIngredients[i] === "Basket Combo") {
        await AddToCart("mod", visibleIngredients[i], quantities[i], 0);
      }
    }
    await AddToCart("item", text, 1, price);
  }

  async function checkoutClick() {
    await addAllToCart();
    localStorage.setItem("checkout", "true");
    setTimeout(function () {
      if (window.location.pathname === "/checkout") {
        window.location.reload();
      }
    }, 1000);
  }

  const STYLES = ['style1', 'style2'];
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
            <Button className="checkout" buttonStyle='btn--outline' path={'/checkout'}>CHECK OUT</Button>
            </div>
        </>
      )}
      {checkPopupStyle === "style2" && (
        <Login />
      )}
      </div>
    </div>
  );
}

export default Popup;
