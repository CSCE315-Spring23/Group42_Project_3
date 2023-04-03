import React from 'react';
import Footer from '../Footer';
import EmployeeCardList from '../EmployeeCardList';
import { Button } from '../Button';

const cardData = {
    cards: [
      {
        text: "Item",
        path: "",
        ingredients: ["bun", "beef patty", "lettuce", "tomato", "cheese"]
      },
      {
        text: "Item",
        path: "",
        ingredients: ["bun", "veggie patty", "lettuce", "tomato", "avocado"]
      },
      {
        text: "Item",
        path: "",
        ingredients: ["bun", "chicken patty", "lettuce", "tomato", "mayo"]
      },
      {
        text: "Item",
        path: "",
        ingredients: ["bun", "pork patty", "lettuce", "tomato", "bbq sauce"]
      },
      {
        text: "Item",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "Item",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "Item",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "Item",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "Item",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "Item",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "Item",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "Item",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "Item",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "Item",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "Item",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "Item",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "Item",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "Item",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "Item",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "Item",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "Item",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "Item",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "Item",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "Item",
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
        {/* <button>Checkout</button> */}
        {/* <Button text = "Checkout" buttonStyle={"btn--primary"}/> */}
        <Button buttonStyle='btn--primary' path='/checkout'>CHECK OUT</Button>
        <Footer/>
      </>);
}
export default EmployeeView