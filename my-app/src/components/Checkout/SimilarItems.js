import React, { useEffect, useState } from 'react';
import './SimilarItem.css';
import CardItem from '../CardItem';
import {GetMenuList, GetIngredients, GetSoldTogether, GetCartItems} from '../pages/databaseFunctions'
import Loading from '../Loading';
import './cart.css'

/**
 * React component that displays a list of similar menu items based on the items in the user's cart.
 *
 * @returns {JSX.Element} JSX element that renders a list of recommended menu items.
 */
function SimilarItems() {
  const [startDate, setStartDate] = useState('2020-01-01');
  const [endDate, setEndDate] = useState('2025-01-01');
  const soldTogether = GetSoldTogether(startDate, endDate);
  // bacon cheeseburger and tots to replicate issue
  const myCart = GetCartItems();
  var menuItems = GetMenuList(1, 25);
  var ingredientsArr = GetIngredients(1, 25);

  if (
    menuItems.length === 0 ||
    ingredientsArr.length === 0 ||
    soldTogether.length === 0 ||
    myCart.length === 0
  ) {
    return <Loading />;
  }

  const filteredData = soldTogether.filter(item => {
    const inMyCart1 = myCart.some(cartItem => cartItem.name === item.menuItem1);
    const inMyCart2 = myCart.some(cartItem => cartItem.name === item.menuItem2);
    return inMyCart1 ^ inMyCart2;
  }); // remove pairs where both are already in the cart

  var recsList = [];
  const numRecs = Math.min(filteredData.length, 3);

  for (let i = 0; i < numRecs; i++) {
    recsList.push(filteredData[i].menuItem1);
    recsList.push(filteredData[i].menuItem2);
  }
  recsList = recsList.filter(item => !myCart.some(cartItem => cartItem.name === item));

  const menuItemsFiltered = menuItems.filter(menuItem => {
    return recsList.indexOf(menuItem.menu_item_name) !== -1;
  });

  const numMenuItems = menuItemsFiltered.length;

  var ingredientsArrFiltered = [];
  var ids = [];

  for (let i = 0; i < numMenuItems; i++) {
    ids.push(menuItemsFiltered[i].menu_item_id - 1);
    ingredientsArrFiltered.push(ingredientsArr[ids[i]]);
  }

  const cardData = {
    cards: []
  };

  for (let i = 0; i < numMenuItems; i++) {
    const item = menuItemsFiltered[i];
    const ingr = ingredientsArrFiltered[i];

    if (!ingr.includes("Combo") && ids[i] < 11) {
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

  /**
   * Renders a list of recommended menu items as CardItem components.
   *
   * @returns {JSX.Element[]} Array of JSX elements that render CardItem components for each recommended menu item.
   */
  const renderCards = () => {
    return cardData.cards.slice(0, sze).map((card, index) => {
      return (
        <CardItem
          src={card.image}
          text={card.text}
          label={card.label}
          key={index}
          ingredients={card.ingredients}
          style = 'ci'
        />
      );
    });
  };

  return (
    <div className='similar'>
      <div className='ccc'>
        <h1 className='PeopleAlsoOrder'>People Also Order</h1>
        <div className='cards__wrapper'>
          <ul className='scrt'>{renderCards()}</ul>
        </div>
      </div>
    </div>
  );
}

export default SimilarItems;

