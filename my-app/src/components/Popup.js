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

  function checkoutClick() {
    console.log("Adding to cart: ",text, price);
    console.log("Ingr list: " + visibleIngredients);
    console.log("quant list: " + quantities);
    for (let i = 0; i < visibleIngredients.length; i++) {
      if(quantities[i] !== 0 || visibleIngredients[i] === "Vanilla Ice Cream" || visibleIngredients[i] === "x" || visibleIngredients[i] === "Combo" || visibleIngredients[i] === "Basket Combo")
        AddToCart("mod", visibleIngredients[i], quantities[i], 0);
    }
    // if(visibleIngredients.includes("Combo") && quantities[visibleIngredients.indexOf("Combo")] !== -1){
    //   //AddToCart("mod", "Combo", quantities[visibleIngredients.indexOf("Combo")], 0);
    //   price += 1.90;
    // }
    // if(visibleIngredients.includes("Basket Combo") && quantities[visibleIngredients.indexOf("Basket Combo")] !== -1){
    //   //AddToCart("mod", "Basket Combo", quantities[visibleIngredients.indexOf("Basket Combo")], 0);
    //   price += 1.10;
    // }
    AddToCart("item", text, 1, price);
    localStorage.setItem("checkout", "true");
    if (window.location.pathname === "/checkout") {
      window.location.reload();
    }
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
      <Button className="cart" buttonStyle="btn--outline" onClick={() => { checkoutClick(); onClose(); }}>ADD TO CART</Button>
      <Button className= "checkout" buttonStyle='btn--outline' path={'/checkout'}>CHECK OUT</Button>
      </div>
      </div>
      </div>
  );
}

export default Popup;
