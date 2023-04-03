import React from 'react';
import Footer from '../Footer';
import EmployeeCardList from '../EmployeeCardList';
import { Button } from '../Button';

const cardData = {
    cards: [
      {
        text: "Burger",
        path: "",
        ingredients: ["bun", "beef patty", "lettuce", "tomato", "cheese"]
      },
      {
        text: "Sandwich",
        path: "",
        ingredients: ["bun", "veggie patty", "lettuce", "tomato", "avocado"]
      },
      {
        text: "Basket",
        path: "",
        ingredients: ["bun", "chicken patty", "lettuce", "tomato", "mayo"]
      },
      {
        text: "Sides",
        path: "",
        ingredients: ["bun", "pork patty", "lettuce", "tomato", "bbq sauce"]
      },
      {
        text: "Seasonal Stuff",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "Other",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
    ],
  };

function EmployeeView() {
    return (<>
        <div id="employeemenu">
            <EmployeeCardList cardData={cardData} title="Employee View" />
            
        </div>
        <button>Checkout</button>
        <Footer/>
      </>);
}
export default EmployeeView