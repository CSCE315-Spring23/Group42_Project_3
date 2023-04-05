import React from 'react';
import Footer from '../Footer';
import EmployeeCardList from '../EmployeeCardList';
import { Button } from '../Button';

const cardData = {
    cards: [
      {
        text: "1. Revs Burger",
        path: "",
        ingredients: ["bun", "beef patty", "lettuce", "tomato", "cheese"]
      },
      {
        text: "2. Double Cheese Burger",
        path: "",
        ingredients: ["bun", "veggie patty", "lettuce", "tomato", "avocado"]
      },
      {
        text: "3. Classic Burger",
        path: "",
        ingredients: ["bun", "chicken patty", "lettuce", "tomato", "mayo"]
      },
      {
        text: "4. Bacon Cheeseburger",
        path: "",
        ingredients: ["bun", "pork patty", "lettuce", "tomato", "bbq sauce"]
      },
      {
        text: "5. Three Tender Basket",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "6. Four Steak Finger Basket",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "7. Gig Em Patty Melt",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "8. Howdy Chicken Sandwich",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "9. Chicken Tender Sandwich",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "10. Grilled Cheese",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "11. Burger/Sandwich Combo",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "12. Basket Combo",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "13. Aggie Shake",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "14. Double Scoop Ice Cream",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "15. Chocolate Cookie",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "16. Brownie",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "17. Salad Bar",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "18. Sauce",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "19. Fountain Drink",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "20. Drip Coffee",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "21. Cold Brew",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "22. Fries",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "23. Tater Tots",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "24. Onion Rings",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "25. Kettle Chips",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "26. Silverware",
        path: "",
        ingredients: ["bun", "lamb patty", "lettuce", "tomato", "tzatziki sauce"]
      },
      {
        text: "28. Seasonal Item",
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