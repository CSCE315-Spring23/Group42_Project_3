import React from 'react';
import './View.css';
import Item from './Item';

/**
 * A component for displaying a menu board with various menu items.
 * @param {object} props - The props object passed to this component.
 * @param {object[]} props.burgers - An array of burger menu items.
 * @param {object[]} props.baskets - An array of basket menu items.
 * @param {object[]} props.sandwiches - An array of sandwich menu items.
 * @param {object[]} props.sides - An array of side menu items.
 * @param {object[]} props.seasonal - An array of seasonal menu items.
 */
const MenuBoardView = ({burgers, baskets, sandwiches, sides, seasonal}) => {
  return (
    <div className='body'> 
      <div className='content'>
        {/* Add logo */}
        
        <div className='menu-items'>
          <div className='menu-column one'>
            <h2>BURGERS</h2>
            <p className='mb-text'>Choose a Beef or Chipotle Black Bean Patty</p>
            <p className='mb-text'>All Combos include a Fountain Drink and Fries or Kettle Chips + $1.90</p>
            <ul>
              {burgers.map((item) => (
                <Item key={item.name} name={item.name} price={item.price} ingredients={item.ingredients} />
              ))}
            </ul>
            <h2>SANDWICHES</h2>
            <p className='mb-text'>All Combos include a Fountain Drink and Fries or Kettle Chips + $1.90</p>
            <ul>
              {sandwiches.map((item) => (
                <Item key={item.name} name={item.name} price={item.price} ingredients={item.ingredients} />
              ))}
            </ul>
          </div>
          <div className='menu-column two'>
          <img className='logo' src='images/Revs-logo.png' alt="Rev's American Grill" />
        <div className='stripe'></div>
            <h2>BASKETS</h2>
            <p className='mb-text'>All Combos include a Fountain Drink + $1.10</p>
            <ul>
              {baskets.map((item) => (
                <Item key={item.name} name={item.name} price={item.price} ingredients={item.ingredients} />
              ))}
            </ul>
            <h2>SEASONAL</h2>
            <ul>
              {seasonal.map((item) => (
                <Item key={item.name} name={item.name} price={item.price} ingredients={item.ingredients} />
              ))}
            </ul>
          </div>
          <div className='menu-column three'>
            <h2>SHAKES 'N SWEETS</h2>
            <ul>
              {sides.map((item) => (
                <Item key={item.name} name={item.name} price={item.price} ingredients={item.ingredients} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuBoardView;
