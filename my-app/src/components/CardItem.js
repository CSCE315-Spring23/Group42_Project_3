import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from './Popup';

//Used for displaying menu items in our menu page
function CardItem(props) {
  const [showPopup, setShowPopup] = useState(false);

  function togglePopup() {
    setShowPopup(!showPopup);
  }

  return (
    <>
      <li className='cards__item'>
        {props.path ? (
          <Link className='cards__item__link' to={props.path}>
            <figure className='cards__item__pic-wrap' data-category={props.label}>
              <img
                className='cards__item__img'
                alt='Food item image'
                src={props.src}
              />
            </figure>
            <div className='cards__item__info'>
              <h5 className='cards__item__text'>{props.text}</h5>
            </div>
          </Link>
        ) : (
          <Link className='cards__item__link' onClick={togglePopup}>
            <figure className='cards__item__pic-wrap' data-category={props.label}>
              <img
                className='cards__item__img'
                alt='Food item image'
                src={props.src}
              />
            </figure>
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

export default CardItem;
