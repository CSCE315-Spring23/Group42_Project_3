import React from 'react';
import Footer from '../Footer';
import CardList from '../CardList';
import Navbar from '../Navbar';
import { menuLinks, buttonText, buttonPath } from '../NavbarData';

/**
 * Renders the menu page with a list of menu options for customers to choose from and add to their orders.
 * @returns {JSX.Element} The rendered menu page.
 */
function Menu() {
  /**
   * The data for each card in the CardList.
   * @typedef {Object} CardData
   * @property {string} image - The path to the image for the card.
   * @property {string} text - The text to display on the card.
   * @property {string} path - The path to the page to navigate to when the card is clicked.
   */
  const cardData = {
    cards: [
      {
        image: "images/burger-img-1.jpg",
        text: "Burgers",
        path: "/Burgers",
      },
      {
        image: "images/sandwich-img-1.jpg",
        text: "Sandwiches",
        path: "/Sandwiches",
      },
      {
        image: "images/basket-img-1.jpg",
        text: "Baskets",
        path: "/Baskets",
      },
      {
        image: "images/side-img-1.jpg",
        text: "Sides",
        path: "/Sides",
      },
      {
        image: "images/seasonal-img-1.jpg",
        text: "Seasonal",
        path: "/Seasonal",
      },
    ],
  };

  return (
    <>
      <Navbar links={menuLinks} buttonText={buttonText} buttonPath={buttonPath} />
      <CardList cardData={cardData} title="MENU" />
      <Footer />
    </>
  );
}

export default Menu;
