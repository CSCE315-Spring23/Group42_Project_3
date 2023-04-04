import React from 'react';
import Card from '../Cards';
import Navbar from '../CustomerNavbar';

function Checkout({ selectedIngredients }) {
  return (
    <div>
      {selectedIngredients.map((ingredient, index) => (
        <Card
          key={index}
          title={ingredient.title}
          text={`Quantity: ${ingredient.quantity}`}
          image={ingredient.image}
          ingredients={ingredient.ingredients}
        />
      ))}
    </div>
  );
}

export default Checkout;
