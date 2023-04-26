import React from 'react';
import './SimilarItem.css';
import CardItem from './CardItem';
import {GetMenuList, GetIngredients} from '../pages/databaseFunctions'
import Loading from '../Loading';
import './cart.css'

function SimilarItems() {
  var menuItems = GetMenuList(5, 7);
  var ingredientsArr = GetIngredients(5, 7);

  if (menuItems.length === 0 | ingredientsArr.length === 0) {
    return <Loading />;
  }

  const cardData = {
    cards: []
  };

  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    const ingr = ingredientsArr[i];
    if (!ingr.includes("Combo")) {
      ingr.push("Combo");
    }
    const card = {
      image: item.image_link,
      text: item.menu_item_name,
      label: item.menu_item_cost,
      ingredients: ingr
    };
    cardData.cards.push(card);
  }

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
