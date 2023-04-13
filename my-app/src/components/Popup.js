import React, {useState} from 'react';
//import { Link } from 'react-router-dom';
import { Button } from './Button';
import {AddToCart} from './pages/databaseFunctions'
import {IngredientForm} from './IngredientForm';
import './Popup.css';

function Popup({text, ingredients, onClose}) {
  //const i = ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"];
  const [quantities, setQuantities] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const ingredientsToHide = ["Tray Paper", "Black Bean Patty"];
  const visibleIngredients = ingredients.filter((ingredient) => !ingredientsToHide.includes(ingredient));

  function checkoutClick() {
    AddToCart("item", text, 1);
    for (let i = 0; i < visibleIngredients.length; i++) {
      //console.log(quantities[i] + " units of " + visibleIngredients[i]);
      if(quantities[i] !== 0)
        AddToCart("mod", visibleIngredients[i], quantities[i]);
    }
  }

  //get these from database by passing in name
  // const i = {ingredients};
  return (
    <div className='popup'>
      <div className='popup__content'>
      <p>{text} </p>
      <IngredientForm ingredients={visibleIngredients} setQuantities = {setQuantities}></IngredientForm>
      <Button className = "close" buttonStyle='btn--outline' onClick={onClose}>X</Button>
      <Button className= "cart" buttonStyle='btn--outline' onClick={checkoutClick}>ADD TO CART</Button>
      <Button className= "checkout" buttonStyle='btn--outline' path={'/checkout'}>CHECK OUT</Button>
      </div>
      </div>
  );
}

export default Popup;
