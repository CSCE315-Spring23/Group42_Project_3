import React from 'react';
import './SimilarItem.css';
import CardItem from './CardItem';
import {GetMenuList, GetIngredients, GetSoldTogether, GetCartItems} from '../pages/databaseFunctions'
import Loading from '../Loading';
import './cart.css'

function SimilarItems() {
  const soldTogether = GetSoldTogether();
  const myCart = GetCartItems();
  var menuItems = GetMenuList(1, 25);
  var ingredientsArr = GetIngredients(1, 25);

  if (menuItems.length === 0 | ingredientsArr.length === 0 |
    soldTogether.length === 0 | myCart.length === 0) {
    return <Loading />;
  }
  //console.log("mycart: ", myCart);
  //console.log("Together: ", soldTogether);
  // if (soldTogether.length === 0 | myCart.length === 0) {
  //   setTimeout(() => {}, 100);
  // }

  const filteredData = soldTogether.filter(item => {
    const inMyCart1 = myCart.some(cartItem => cartItem.name === item.menuItem1);
    const inMyCart2 = myCart.some(cartItem => cartItem.name === item.menuItem2);
    return (inMyCart1 ^ inMyCart2);
  }); //remove pairs where both are already in the cart
  //console.log("Filter before: " + soldTogether.length + ", after: " + filteredData.length);
  var recsList = [];
  // if(filteredData.length !== 3) {
  //   console.log("Invalid length: ", filteredData.length);
  //   console.log("Sold together length: ", soldTogether.length);
  //   console.log("Cart length: ", myCart.length);
  // }
  const numRecs = Math.min(filteredData.length, 3);
  //console.log("Data: ", filteredData);
  //console.log(filteredData[0].menuItem1);
  for(let i = 0; i < numRecs; i++){
      recsList.push(filteredData[i].menuItem1);
      recsList.push(filteredData[i].menuItem2);
  }
  recsList = recsList.filter(item => !myCart.some(cartItem => cartItem.name === item));

  const menuItemsFiltered = menuItems.filter(menuItem => {
    return recsList.indexOf(menuItem.menu_item_name) !== -1;
  });

  var ingredientsArrFiltered = [];
  var ids = [];
  for(let i = 0; i < numRecs; i++){
      ids.push(menuItemsFiltered[i].menu_item_id-1);
      ingredientsArrFiltered.push(ingredientsArr[ids[i]]);
  }
  console.log("recs:", menuItemsFiltered);
  console.log("ingredients:", ingredientsArrFiltered);

  const cardData = {
    cards: []
  };

  for (let i = 0; i < numRecs; i++) {
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
