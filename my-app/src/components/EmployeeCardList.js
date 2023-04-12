import React from 'react';
import './Cards.css';
import EmployeeCardItem from './EmployeeCardItem';

//Show items in a list
function EmployeeCardList({cardData, title} ) {

  return (
    <div className='cards'>
      <h1>{title}</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            {cardData.cards.slice(0, 8).map((card, index) => {
              return (
                <EmployeeCardItem
                  text={card.text}
                  path={card.path}
                  key={index}
                  ingredients = {card.ingredients}
                />
              );
            })}
          </ul>
          <ul className='cards__items'>
            {cardData.cards.slice(8, 16).map((card, index) => {
              return (
                <EmployeeCardItem
                  text={card.text}
                  path={card.path}
                  key={index}
                  ingredients = {card.ingredients}
                />
              );
            })}
          </ul>
          <ul className='cards__items'>
            {cardData.cards.slice(16, 24).map((card, index) => {
              return (
                <EmployeeCardItem
                  text={card.text}
                  path={card.path}
                  key={index}
                  ingredients = {card.ingredients}
                />
              );
            })}
          </ul>
          <ul className='cards__items'>
            {cardData.cards.slice(24, 27).map((card, index) => {
              return (
                <EmployeeCardItem
                  text={card.text}
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
