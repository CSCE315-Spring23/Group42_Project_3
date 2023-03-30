import React from 'react';
import Footer from '../Footer';
import CardList from '../CardList';

const cardData = {
    cards: [
      {
        image: "images/sandwich-img-1.jpg",
        text: "Sandwiches",
        label: "Label 1",
        path: "/card1",
      },
      {
        image: "images/sandwich-img-1.jpg",
        text: "Sandwiches",
        label: "Label 2",
        path: "/card2",
      },
      {
        image: "images/sandwich-img-1.jpg",
        text: "Baskets",
        label: "Label 1",
        path: "/card1",
      },
      {
        image: "images/sandwich-img-1.jpg",
        text: "Sides",
        label: "Label 1",
        path: "/card1",
      },
    ],
  };
  

function Sandwiches() {
    return (<>
    <div id="menu">
        <CardList cardData={cardData} title="SANDWICHES" />
    </div>

      <Footer/>
    </>);
  }
  
  export default Sandwiches;
