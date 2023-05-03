import React from 'react';
import './Cards.css';

/**
  * React component that displays a single item for an employee view.
  * @param {Object} props - The props object containing the following properties:
  * @param {string} props.text - The text to display for the item.
  * @param {string} props.ingredients - The ingredients to display for the item.
  * @returns {JSX.Element} - A React JSX element representing the EmployeeCard component.
*/
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
