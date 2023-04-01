import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import IngredientForm from './IngredientForm';
import './Popup.css';

function Popup({text, ingredients, onClose}) {
  const i = ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"];
  const [quantities, setQuantities] = useState([0, 0, 0, 0, 0]);

  const addToCart = () => {
    // You can pass the quantities to the backend here to add to cart
    // setSelectedIngredients([...selectedIngredients, selectedIngredient]);
  }

  //get these from database by passing in name
  // const i = {ingredients};
  return (
    <div className='popup'>
      <div className='popup__content'>
      <p>{text} </p>
      <IngredientForm ingredients={i} setQuantities = {setQuantities}></IngredientForm>
      <Button className = "close" buttonStyle='btn--outline' onClick={onClose}>X</Button>
      <Button className= "cart" buttonStyle='btn--outline' onClick={addToCart}>ADD TO CART</Button>
      <Button className= "checkout" buttonStyle='btn--outline' path={'/checkout'}>CHECK OUT</Button>
      </div>
      </div>
  );
}

export default Popup;
