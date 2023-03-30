import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function CardList(props) {
  const { cardData, title } = props;

  return (
    <div className='cards'>
      <h1>{title}</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            {cardData.cards.slice(0, 2).map((card, index) => {
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
            {cardData.cards.slice(2).map((card, index) => {
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
