import React from 'react';
import './Cards.css';
import EmployeeCardItem from './EmployeeCardItem';
import {GetMenuList} from './pages/databaseFunctions'

/**
 * A React component that displays a list of cards containing items to be viewed by employees.
 *
 * @component
 * @param {object} cardData - An object containing data to be displayed on each card.
 * @param {string} title - The title to be displayed above the card list.
 * @returns {JSX.Element} A React JSX element representing a list of cards.
 */
function EmployeeCardList({ cardData, title }) {

  /**
   * Gets the menu items from the database.
   *
   * @function
   * @returns {Array} An array containing the menu items.
   */
  var menuItems = GetMenuList(0, 0);

  var lastSlice = menuItems.length;

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
                  label={card.label}
                  path={card.path}
                  key={index}
                  ingredients={card.ingredients}
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
                  label={card.label}
                  key={index}
                  ingredients={card.ingredients}
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
                  label={card.label}
                  key={index}
                  ingredients={card.ingredients}
                />
              );
            })}
          </ul>
          <ul className='cards__items'>
            {cardData.cards.slice(24, lastSlice).map((card, index) => {
              return (
                <EmployeeCardItem
                  text={card.text}
                  path={card.path}
                  label={card.label}
                  key={index}
                  ingredients={card.ingredients}
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
