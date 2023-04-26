import React from 'react';
import './SimilarItem.css';
import CardItem from './CardItem';
import './cart.css'

function SimilarItems() {
    const cardData = {
        cards: [
          {
            image: "images/burger-img-1.jpg",
            text: "Burgers",
            label: "",
            path: "",
            ingredients: [],
          },
          {
            image: "images/sandwich-img-1.jpg",
            text: "Sandwiches",
            label: "",
            path: "",
            ingredients: [],
          },
          {
            image: "images/basket-img-1.jpg",
            text: "Baskets",
            label: "",
            path: "",
            ingredients: [],
          },
        ],
      };

  const sze = cardData.cards.length;

  return (
    <div className='similar'>
      <div className='ccc'>
      <h1 className='PeopleAlsoOrder'>People Also Order</h1>
        <div className='cards__wrapper'>
          <ul className='scrt'>
            {cardData.cards.slice(0, sze).map((card, index) => {
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

export default SimilarItems;
