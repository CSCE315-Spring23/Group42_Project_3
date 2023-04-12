import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from './Popup';

//Used to display items in Employee View
function EmployeeCardItem(props) {
  const [showPopup, setShowPopup] = useState(false);

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
        <Popup text = {props.text} ingredients = {props.ingredients} onClose={togglePopup} />
      )}
    </>
  );
}

export default EmployeeCardItem;
