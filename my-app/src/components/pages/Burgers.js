//import React from 'react';
import Footer from '../Footer';
import CardList from '../CardList';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Burgers() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    async function fetchMenuItems() {
      const response = await fetch('http://localhost:3001/burgerRequest');
      const data = await response.json();
      setMenuItems(data);
    }

    fetchMenuItems();
  }, []);

  //console.log(menuItems);
  if (menuItems.length === 0) {
    return <div>Loading...</div>;
  }

  //let bName = menuItems[0].menu_item_name;
//  let bName = "h";
  const cardData = {
      cards: [
        {
          image: "images/burger-img-1.jpg",
          text: menuItems[0].menu_item_name,
          label: "Label 1",
          path: "",
          ingredients: ["bun", "beef patty", "lettuce", "tomato", "cheese"]
        },
        {
          image: "images/burger-img-1.jpg",
          text: menuItems[1].menu_item_name,
          label: "Label 1",
          path: "",
          ingredients: ["bun", "veggie patty", "lettuce", "tomato", "avocado"]
        },
        {
          image: "images/burger-img-1.jpg",
          text: menuItems[2].menu_item_name,
          label: "Label 1",
          path: "",
          ingredients: ["bun", "chicken patty", "lettuce", "tomato", "mayo"]
        },
        {
          image: "images/burger-img-1.jpg",
          text: menuItems[3].menu_item_name,
          label: "Label 1",
          path: "",
          ingredients: ["bun", "pork patty", "lettuce", "tomato", "bbq sauce"]
        },
      ],
    };

    return (<>
    <div id="menu">
        <CardList cardData={cardData} title="BURGERS" />
    </div>

      <Footer/>
    </>);
  }

  export default Burgers;
