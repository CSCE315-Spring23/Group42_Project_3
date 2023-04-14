import React from 'react';
import Footer from '../Footer';
import CardList from '../CardList';
import Navbar from '../CustomerNavbar';

{/*
* Shows all the menu options for customers to choose from and add to their orders
* @author: 
*/ }
const cardData = {
  cards: [
    {
      image: "images/burger-img-1.jpg",
      text: "Burgers",
      label: "Label 1",
      path: "/Burgers",
    },
    {
      image: "images/sandwich-img-1.jpg",
      text: "Sandwiches",
      label: "Label 2",
      path: "/Sandwiches",
    },
    {
      image: "images/basket-img-1.jpg",
      text: "Baskets",
      label: "Label 1",
      path: "/Baskets",
    },
    {
      image: "images/side-img-1.jpg",
      text: "Sides",
      label: "Label 1",
      path: "/Sides",
    },
    {
      image: "images/seasonal-img-1.jpg",
      text: "Seasonal",
      label: "Label 1",
      path: "/Seasonal",
    },
  ],
};
  

{/* HTML structure*/ }
function Menu() {
    return (<>
      <Navbar />
      <CardList cardData={cardData} title="MENU" />
      <Footer/>
    </>);
  }
  
  export default Menu;
