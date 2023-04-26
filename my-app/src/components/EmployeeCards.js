import React from 'react';
import './Cards.css';

//Display one item
function EmployeeCard({text, ingredients}) {
  console.log("Ingredients in cards: " + ingredients);
  return (
    <div className='card'>
      <div className='card-body'>
        <h2 className='card-title'>{text}</h2>
        <p className='card-text'>{text}</p>
      </div>
    </div>
  );
}

export default EmployeeCard;
