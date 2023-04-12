import React, { useState } from 'react';
import { Button } from './Button';
import './IngredientForm.css';

/*
* Ingredient list used to customize orders such as Burgers and sandwiches
*
*/
const IngredientForm = ({ ingredients, setQuantities }) => {
  const [quantityValues, setQuantityValues] = useState(ingredients.map(() => 0));

  const handleChange = (index, value) => {
    const newValues = [...quantityValues];
    // If the user selects "Regular", deselect the previously selected button (if any)
    if (value === 0) {
      newValues[index] = (newValues[index] === 0) ? -1 : 0;
    } else {
      newValues[index] = (newValues[index] === value) ? 0 : value;
    }
    setQuantityValues(newValues);
    setQuantities(newValues);
  };

  const specialButtons = [
    {
        label1: "None",
        label2: "Regs",
        label3: "Extra",
        show: "y",
    },
    {
        label1: "Regular",
        label2: "Black Bean",
        label3: "",
        show: "y",
    },
    {
        label1: "",
        label2: "",
        label3: "",
        show: "n",
    },
  ];

  function getButtonsIndex(ingredient) {
    if(ingredient === "Beef Patty"){
      return 1;
    }
    return 0;
  }

  const visibleIngredients = ingredients.filter((ingredient) => ingredient !== "Tray Paper");

  return (
    <div className="form-container">
      <form>
        {visibleIngredients.map((ingredient, index) => (
          <div key={index} className="form-row">
            <label>{ingredient}</label>
            <div className="quantity-buttons">
              <Button
                buttonStyle={quantityValues[index] === -1 ? "btn--primary" : "btn--outline"}
                buttonSize="btn--medium"
                onClick={() => handleChange(index, -1)}
              >
                {specialButtons[getButtonsIndex(ingredient)].label1}
              </Button>
              <Button
                buttonStyle={quantityValues[index] === 0 ? "btn--primary" : "btn--outline"}
                buttonSize="btn--medium"
                onClick={() => handleChange(index, 0)}
              >
                {specialButtons[getButtonsIndex(ingredient)].label2}
              </Button>
              {specialButtons[getButtonsIndex(ingredient)].label3 !== "" && (
                <Button
                  buttonStyle={quantityValues[index] === 1 ? "btn--primary" : "btn--outline"}
                  buttonSize="btn--medium"
                  onClick={() => handleChange(index, 1)}
                >
                  {specialButtons[getButtonsIndex(ingredient)].label3}
                </Button>
              )}
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default IngredientForm;
