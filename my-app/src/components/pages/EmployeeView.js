import React from 'react';
import Footer from '../Footer';
import {GetMenuList, GetIngredients} from './databaseFunctions'
import EmployeeCardList from '../EmployeeCardList';
import { Button } from '../Button';
import Navbar from '../Navbar';
import { employeeLinks, buttonText } from '../NavbarData';
import Loading from '../Loading';

{/*
* Shows Employee View so they can log in and access features not visible for customers
* @author:
*/ }

  //Implemented


  function EmployeeView() {
    var menuItems = GetMenuList(0, 0);
    var ingredientsArr = GetIngredients(1, menuItems.length);

    if (menuItems.length === 0 | ingredientsArr.length === 0) {
      return <Loading />;
    }

  const cardData = {
    cards: []
  };

  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    const ingr = ingredientsArr[i];
    if (!ingr.includes("Combo") && (i <= 4 || (i > 6 && i <= 10))) {
      ingr.push("Combo");
    }
    if (!ingr.includes("Basket Combo") && i > 4 && i <= 6) {
      ingr.push("Basket Combo");
    }
    const card = {
      // image: "images/sandwich-img-1.jpg",
      text: item.menu_item_name,
      label: item.menu_item_cost,
      //path: "",
      ingredients: ingr
    };
    //console.log("Menu items in cards: " + menuItems[i].menu_item_name);
    console.log("Ingredients in cards: " + ingredientsArr[i]);
    cardData.cards.push(card);
  }



    return (<>
        <Navbar type = 'e' links={employeeLinks} buttonText={buttonText} buttonPath='/EmployeeCheckout' />
        <div id="employeemenu">
            <EmployeeCardList cardData={cardData} title="Employee View" />
        </div>



         {/* <button>Checkout</button> */}
         {/* <Button text = "Checkout" buttonStyle={"btn--primary"}/> */}
         <Button buttonStyle='btn--primary' path='/employeecheckout'>CHECK OUT</Button>
         <Footer/>
       </>);
}
export default EmployeeView
