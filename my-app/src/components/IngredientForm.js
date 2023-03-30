import React, { useState } from 'react';
import { Button } from './Button';
import './IngredientForm.css';

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
  

  // const selectedButton = (i) => {

  // };

  return (
    <div className="form-container">
      <form>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="form-row">
            <label>{ingredient}</label>
            <div className="quantity-buttons">
              <Button
                buttonStyle={quantityValues[index] === -1 ? "btn--primary" : "btn--outline"}
                buttonSize="btn--medium"
                onClick={() => handleChange(index, -1)}
              >
                No
              </Button>
              <Button
                buttonStyle={quantityValues[index] === 0 ? "btn--primary" : "btn--outline"}
                buttonSize="btn--medium"
                onClick={() => handleChange(index, 0)}
              >
                Regular
              </Button>
              <Button
                buttonStyle={quantityValues[index] === 1 ? "btn--primary" : "btn--outline"}
                buttonSize="btn--medium"
                onClick={() => handleChange(index, 1)}
              >
                Extra
              </Button>
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default IngredientForm;
