import React from 'react';
import './Cards.css';
import CardItem from './CardItem';


/**
 * Renders a list of cards with images and text.
 *
 * @param {object} cardData - Object containing an array of card objects.
 * @param {string} title - The title of the card list.
 * @returns {JSX.Element} - The CardList component.
 */
function CardList({cardData, title} ) {
  /**
   * The number of cards in the cardData array.
   *
   * @type {number}
   */
  const sze = cardData.cards.length;

  return (
    <div className='cards'>
      <h1>{title}</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            {cardData.cards.slice(0, sze /2).map((card, index) => {
              return (
                <CardItem
                  src={card.image}
                  text={card.text}
                  label={card.label}
                  path={card.path}
                  key={index}
                  ingredients = {card.ingredients}
                />
              );
            })}
          </ul>
          <ul className='cards__items'>
            {cardData.cards.slice(sze / 2).map((card, index) => {
              return (
                <CardItem
                  src={card.image}
                  text={card.text}
                  label={card.label}
                  path={card.path}
                  key={index}
                  ingredients = {card.ingredients}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CardList;
