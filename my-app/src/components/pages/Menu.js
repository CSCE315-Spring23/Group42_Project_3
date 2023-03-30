import React from 'react';
import Footer from '../Footer';
import CardList from '../CardList';

const cardData = {
    cards: [
      {
        image: "path/to/image1",
        text: "Burger 1",
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
  

function Burgers() {
    return (<>
      <CardList cardData={cardData} title="BURGERS" />

      <Footer/>
    </>);
  }
  
  export default Burgers;
