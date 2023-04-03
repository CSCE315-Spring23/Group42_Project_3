import React from 'react';
import Footer from '../Footer';
import CardList from '../CardList';
import Navbar from '../CustomerNavbar';

const cardData = {
    cards: [
      {
        image: "images/sandwich-img-1.jpg",
        text: "Sandwiches",
        label: "Label 1",
        path: "",
      },
      {
        image: "images/sandwich-img-1.jpg",
        text: "Sandwiches",
        label: "Label 2",
        path: "",
      },
      {
        image: "images/sandwich-img-1.jpg",
        text: "Baskets",
        label: "Label 1",
        path: "",
      },
      {
        image: "images/sandwich-img-1.jpg",
        text: "Sides",
        label: "Label 1",
        path: "",
      },
    ],
  };
  

function Sandwiches() {
    return (<>
    <Navbar/>
    <div id="menu">
        <CardList cardData={cardData} title="SANDWICHES" />
    </div>

      <Footer/>
    </>);
  }
  
  export default Sandwiches;
