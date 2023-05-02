import React, { useState } from 'react';
import { Button } from './Button';
import './IngredientForm.css';

/**
  * This is a functional component called IngredientForm  used to display a form of ingredients and quantity
  * buttons that can be used to customize orders such as burgers and sandwiches.
  * @param {Array} ingredients An array of ingredients to be displayed in the form.
  * @param {Function} setQuantities A function to set the quantity values for each ingredient in the form.
  * @return {JSX.Element} Returns a JSX Element that displays the ingredient form.
*/
const IngredientForm = ({ ingredients, setQuantities }) => {
  // State hook to set the quantity values of the ingredients in the form
  const [quantityValues, setQuantityValues] = useState(ingredients.map(() => 0));

  /**
  * This function is called when a quantity button is clicked. It updates the quantity value for the
  * corresponding ingredient in the state hook.
  * @param {number} index The index of the ingredient in the ingredients array.
  * @param {number} value The value of the button that was clicked.
  */
  const handleChange = (index, value) => {
  const newValues = [...quantityValues];
  newValues[index] = value;
  setQuantityValues(newValues);
  setQuantities(newValues);
  };
  // Array of special buttons for each ingredient
  const specialButtons = [
    {
        label1: "None",
        label2: "Regular",
        label3: "Extra",
        label4: "",
        label5: "",
        label6: "",
        show: "y",
    },
    {
        label1: "Black Bean",
        label2: "Regular",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        show: "y",
    },
    {
        label1: "Chocolate",
        label2: "Vanilla",
        label3: "Coffee",
        label4: "Strawberry",
        label5: "",
        label6: "",
        show: "n",
    },
    {
        label1: "Buffalo",
        label2: "BBQ",
        label3: "Honey Mustard",
        label4: "Ranch",
        label5: "Spicy Ranch",
        label6: "Gig-em Sauce",
        show: "n",
    },
    {
        label1: "None",
        label2: "Fries",
        label3: "Kettle Chips",
        label4: "",
        label5: "",
        label6: "",
        show: "n",
    },
    {
        label1: "None",
        label2: "Fountain Drink",
        label3: "",
        label4: "",
        label5: "",
        label6: "",
        show: "n",
    },
  ];

  /**
  * This function returns the index of the special button array based on the ingredient.
  * @param {string} ingredient The name of the ingredient.
  * @return {number} Returns the index of the special button array.
  */

  function getButtonsIndex(ingredient) {
    if(ingredient === "Beef Patty"){
      return 1;
    }
    if(ingredient === "Vanilla Ice Cream"){
      return 2;
    }
    if(ingredient === "x"){
      return 3;
    }
    if(ingredient === "Combo"){
      return 4;
    }
    if(ingredient === "Basket Combo"){
      return 5;
    }
    return 0;
  }

  function customName(ingredient) {
    if(ingredient === "Beef Patty"){
      return "Patty type";
    }
    if(ingredient === "Vanilla Ice Cream"){
      return "Flavor";
    }
    if(ingredient === "x"){
      return "";
    }
    if(ingredient === "Basket Combo"){
      return "Combo";
    }
    return ingredient;
  }

  return (
    <div className="form-container">
      <form>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="form-row">
            <label>{customName(ingredient)}</label>
            <div className="quantity-buttons">
              <Button
                buttonStyle={quantityValues[index] === -1 ? "btn--primary" : "btn--outline"}
                buttonSize="btn--medium"
                onClick={() => handleChange(index, -1)}
              >
                {specialButtons[getButtonsIndex(ingredient)].label1}
              </Button>
              {specialButtons[getButtonsIndex(ingredient)].label2 !== "" && (
                <Button
                  buttonStyle={quantityValues[index] === 0 ? "btn--primary" : "btn--outline"}
                  buttonSize="btn--medium"
                  onClick={() => handleChange(index, 0)}
                >
                  {specialButtons[getButtonsIndex(ingredient)].label2}
                </Button>
              )}
              {specialButtons[getButtonsIndex(ingredient)].label3 !== "" && (
                <Button
                  buttonStyle={quantityValues[index] === 1 ? "btn--primary" : "btn--outline"}
                  buttonSize="btn--medium"
                  onClick={() => handleChange(index, 1)}
                >
                  {specialButtons[getButtonsIndex(ingredient)].label3}
                </Button>
              )}
              {specialButtons[getButtonsIndex(ingredient)].label4 !== "" && (
                <Button
                  buttonStyle={quantityValues[index] === 2 ? "btn--primary" : "btn--outline"}
                  buttonSize="btn--medium"
                  onClick={() => handleChange(index, 2)}
                >
                  {specialButtons[getButtonsIndex(ingredient)].label4}
                </Button>
              )}
              {specialButtons[getButtonsIndex(ingredient)].label5 !== "" && (
                <Button
                  buttonStyle={quantityValues[index] === 3 ? "btn--primary" : "btn--outline"}
                  buttonSize="btn--medium"
                  onClick={() => handleChange(index, 3)}
                >
                  {specialButtons[getButtonsIndex(ingredient)].label5}
                </Button>
              )}
              {specialButtons[getButtonsIndex(ingredient)].label6 !== "" && (
                <Button
                  buttonStyle={quantityValues[index] === 4 ? "btn--primary" : "btn--outline"}
                  buttonSize="btn--medium"
                  onClick={() => handleChange(index, 4)}
                >
                  {specialButtons[getButtonsIndex(ingredient)].label6}
                </Button>
              )}
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export {IngredientForm};
