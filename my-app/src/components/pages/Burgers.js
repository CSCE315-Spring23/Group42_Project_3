//import React from 'react';
import Footer from '../Footer';
import CardList from '../CardList';
// const {database} = require('../../database');
import Navbar from '../CustomerNavbar';
//
//test();
let bName = "hi";
const cardData = {
    cards: [
      {
        image: "images/burger-img-1.jpg",
        text: bName,
        label: "Label 1",
        path: "",
        ingredients: ["bun", "beef patty", "lettuce", "tomato", "cheese"]
      },
      {
        image: "images/burger-img-1.jpg",
        text: "Burger",
        label: "Label 1",
        path: "",
        ingredients: ["bun", "veggie patty", "lettuce", "tomato", "avocado"]
      },
      {
        image: "images/burger-img-1.jpg",
        text: "Burger",
        label: "Label 1",
        path: "",
        ingredients: ["bun", "chicken patty", "lettuce", "tomato", "mayo"]
      },
      {
        image: "images/burger-img-1.jpg",
        text: "Burger",
        label: "Label 1",
        path: "",
        ingredients: ["bun", "pork patty", "lettuce", "tomato", "bbq sauce"]
      },
      {
        image: "images/burger-img-1.jpg",
        text: "Burger",
        label: "Label 1",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
    ],
  };



function Burgers() {

    return (<>
    <Navbar />
    <div id="menu">
        <CardList cardData={cardData} title="BURGERS" />
    </div>

      <Footer/>
    </>);
  }

  export default Burgers;
