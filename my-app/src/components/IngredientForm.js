import React, { useState } from 'react';
import { Button } from './Button';
import './IngredientForm.css';

/*
* Ingredient list used to customize orders such as Burgers and sandwiches
*
*/

const IngredientForm = ({ ingredients, setQuantities }) => {
  // function GetModifications() {
  //   console.log(ingredients);
  //   console.log(quantityValues);
  // }
  const [quantityValues, setQuantityValues] = useState(ingredients.map(() => 0));

  const handleChange = (index, value) => {
    const newValues = [...quantityValues];
    // If the user selects "Regular", deselect the previously selected button (if any)
    // if (value === 0) {
    //   newValues[index] = (newValues[index] === 0) ? -1 : 0;
    // } else {
    //   newValues[index] = (newValues[index] === value) ? 0 : value;
    // }
    newValues[index] = value;
    setQuantityValues(newValues);
    setQuantities(newValues);
  };

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
  ];

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
