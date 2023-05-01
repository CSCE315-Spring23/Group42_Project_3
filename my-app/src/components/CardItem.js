import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from './Popups/Popup';

/**
  * React Component for displaying menu items in our menu page
  * @param {Object} props - The props that were passed to the component
  * @param {string} props.label - The label to be displayed on the card
  * @param {string} props.path - The path to link to if the card is clicked
  * @param {string} props.src - The source URL for the card image
  * @param {string} props.text - The text to be displayed on the card
  * @param {string} props.ingredients - The ingredients to be displayed in the popup
  * @returns {JSX.Element} - Returns the JSX for the component
*/
function CardItem(props) {
  const [showPopup, setShowPopup] = useState(false);

  /**
    * Function for toggling the display of the popup
  */
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
