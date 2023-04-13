import React from 'react';
import './Cards.css';

function Card({ title, text, image, ingredients }) {
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
