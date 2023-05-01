import React from 'react';
import './Cards.css';

/**
 * Card component for displaying a card with title, text, and image.
 * 
 * @param {string} title - The title of the card.
 * @param {string} text - The text content of the card.
 * @param {string} image - The image source URL for the card.
 * @param {Array<string>} ingredients - Optional array of ingredients for the card.
 * @param {string} price - Optional price for the card.
 * @returns {JSX.Element} - A card element with the given information.
 */
function Card({ title, text, image, ingredients, price}) {
  return (
    <div className='card'>
      <img src={image} alt={title} className='card-image' />
      <div className='card-body'>
        <h2 className='card-title'>{title}</h2>
        <p className='card-text'>{text}</p>
      </div>
    </div>
  );
}

export default Card;
