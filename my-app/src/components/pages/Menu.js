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
      label: "",
      path: "/Burgers",
    },
    {
      image: "images/sandwich-img-1.jpg",
      text: "Sandwiches",
      label: "",
      path: "/Sandwiches",
    },
    {
      image: "images/basket-img-1.jpg",
      text: "Baskets",
      label: "",
      path: "/Baskets",
    },
    {
      image: "images/side-img-1.jpg",
      text: "Sides",
      label: "",
      path: "/Sides",
    },
    {
      image: "images/seasonal-img-1.jpg",
      text: "Seasonal",
      label: "",
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
