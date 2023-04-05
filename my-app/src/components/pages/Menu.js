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
        image: "path/to/image1",
        text: "not burger 1",
        label: "Label 1",
        path: "/card1",
      },
      {
        image: "path/to/image2",
        text: "Card 2",
        label: "Label 2",
        path: "/card2",
      },
      {
        image: "path/to/image1",
        text: "Burger 1",
        label: "Label 1",
        path: "/card1",
      },
      {
        image: "path/to/image1",
        text: "Burger 1",
        label: "Label 1",
        path: "/card1",
      },
      {
        image: "path/to/image1",
        text: "Burger 1",
        label: "Label 1",
        path: "/card1",
      },
    ],
  };
  

{/* HTML structure*/ }
function Menu() {
    return (<>
      <CardList cardData={cardData} title="MENU" />

      <Footer/>
    </>);
  }
  
  export default Menu;
