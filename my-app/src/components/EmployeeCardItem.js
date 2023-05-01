import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from './Popups/Popup';

/**
  * EmployeeCardItem Component - used to display items in Employee View
  * @param {object} props - The props object containing the following properties:
  * @param {string} props.path - The path to link to.
  * @param {string} props.text - The text to display for the item.
  * @param {string} props.label - The price of the item.
  * @param {Array} props.ingredients - The array of ingredients for the item.
  * @returns The EmployeeCardItem Component
*/
function EmployeeCardItem(props) {
  const [showPopup, setShowPopup] = useState(false);

  /**
  * Toggle the showPopup state.
  */
  function togglePopup() {
    setShowPopup(!showPopup);
  }

  return (
    <>
      <li className='cards__item'>
        {props.path ? (
          <Link className='cards__item__link' to={props.path}>
        
            <div className='cards__item__info'>
              <h5 className='cards__item__text'>{props.text}</h5>
            </div>
          </Link>
        ) : (
          <Link className='cards__item__link' onClick={togglePopup}>
        
            <div className='cards__item__info'>
              <h5 className='cards__item__text'>{props.text}</h5>
            </div>
          </Link>
        )}
      </li>
      {showPopup && (
        <Popup text = {props.text} price = {props.label} ingredients = {props.ingredients} onClose={togglePopup} />
      )}
    </>
  );
}

export default EmployeeCardItem;
