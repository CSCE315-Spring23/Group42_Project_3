import React from 'react';
import Footer from '../Footer';
import CardList from '../CardList';

const cardData = {
    cards: [
      {
        image: "images/burger-img-1.jpg",
        text: "Burgers",
        label: "Label 1",
        path: "/card1",
      },
      {
        image: "images/burger-img-1.jpg",
        text: "Sandwiches",
        label: "Label 2",
        path: "/card2",
      },
      {
        image: "images/burger-img-1.jpg",
        text: "Baskets",
        label: "Label 1",
        path: "/card1",
      },
      {
        image: "images/burger-img-1.jpg",
        text: "Sides",
        label: "Label 1",
        path: "/card1",
      },
      {
        image: "images/burger-img-1.jpg",
        text: "Seasonal",
        label: "Label 1",
        path: "/card1",
      },
    ],
  };
  

function Burgers() {
    return (<>
    <div id="menu">
        <CardList cardData={cardData} title="BURGERS" />
    </div>

      <Footer/>
    </>);
  }
  
  export default Burgers;
