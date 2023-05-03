import React from 'react';
import Footer from '../Footer';
import CardList from '../CardList';
import Navbar from '../Navbar';
import { menuLinks, buttonText, buttonPath } from '../NavbarData';

{/*
* Shows all the menu options for customers to choose from and add to their orders
* @author: 
*/ }
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
  

{/* HTML structure*/ }
function Menu() {
    return (<>
      <Navbar links={menuLinks} buttonText={buttonText} buttonPath={buttonPath} />
      <CardList cardData={cardData} title="MENU" />
      <Footer/>
    </>);
  }
  
  export default Menu;
