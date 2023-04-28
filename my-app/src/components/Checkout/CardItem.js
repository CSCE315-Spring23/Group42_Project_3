import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from '../Popups/Popup';
import './cart.css'

//Used for displaying menu items in our menu page
function CardItem(props) {
  const [showPopup, setShowPopup] = useState(false);

  function togglePopup() {
    setShowPopup(!showPopup);
  }

  return (
    <>
      <li className='ci'>
        {props.path ? (
          <Link className='ci__link' to={props.path}>
            <figure className='ci__pic-wrap' data-category={props.label}>
              <img
                className='ci__img'
                alt='Food item image'
                src={props.src}
              />
            </figure>
            <div className='ci__info'>
              <h5 className='ci__text'>{props.text}</h5>
            </div>
          </Link>
        ) : (
          <Link className='ci__link' onClick={togglePopup}>
            <figure className='ci__pic-wrap' data-category={props.label}>
              <img
                className='ci__img'
                alt='Food item image'
                src={props.src}
              />
            </figure>
            <div className='ci__info'>
              <h5 className='ci__text'>{props.text}</h5>
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

export default CardItem;
