import React, {useState} from 'react';
//import { Link } from 'react-router-dom';
import { Button } from './Button';
import {AddToCart} from './pages/databaseFunctions'
//import CartApp from './pages/Checkout'
import {IngredientForm} from './IngredientForm';
//import {GetItemPrice} from './pages/databaseFunctions';
import './Popup.css';

function Popup({text, ingredients, onClose, price}) {
  //const i = ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"];
  const [quantities, setQuantities] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const ingredientsToHide = ["Tray Paper", "Black Bean Patty", "Buns", "Small Paper Containers", "Sauce Containers", "Strawberry Ice Cream", "Straws", "Cups", "Chocolate Ice Cream", "Coffee Ice Cream", "Drink Lids", "Milk", "Chocolate Chunk Cookie", "Chocolate Fudge Brownie", "Fountain Drink Syrup", "Coffee", "Fries", "Tater Tots", "Onion Rings", "Kettle Chips", "Chicken Tenders", "Steak Fingers", "Seasonal"];
  const visibleIngredients = ingredients.filter((ingredient) => !ingredientsToHide.includes(ingredient));


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
      setTimeout(function() {
        if (window.location.pathname === "/checkout") {
          window.location.reload();
        }
      }, 1000);
  }

  //get these from database by passing in name
  // const i = {ingredients};
  return (
    <div className='popup'>
      <div className='popup-content'>
      <p>{text} </p>
      <IngredientForm ingredients={visibleIngredients} setQuantities = {setQuantities}></IngredientForm>
      <div className='bottomBar'>
      <Button className = "close" buttonStyle='btn--outline' onClick={onClose}>X</Button>
      <Button className="cart" buttonStyle="btn--outline" onClick={async () => { await checkoutClick();   onClose(); }}>ADD TO CART</Button>
      <Button className= "checkout" buttonStyle='btn--outline' path={'/checkout'}>CHECK OUT</Button>
      </div>
      </div>
      </div>
  );
}

export default Popup;
