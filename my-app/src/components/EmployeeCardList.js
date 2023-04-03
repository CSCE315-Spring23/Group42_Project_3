import React from 'react';
import './Cards.css';
import EmployeeCardItem from './EmployeeCardItem';

function EmployeeCardList({cardData, title} ) {

  return (
    <div className='cards'>
      <h1>{title}</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            {cardData.cards.slice(0, 3).map((card, index) => {
              return (
                <EmployeeCardItem
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
            {cardData.cards.slice(3).map((card, index) => {
              return (
                <EmployeeCardItem
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

export default EmployeeCardList;
