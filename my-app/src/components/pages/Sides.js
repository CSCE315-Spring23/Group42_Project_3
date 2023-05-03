/**
 * Renders a menu of all the sides and drinks along with their prices
 * @returns {JSX.Element} The JSX code for the Sides component
 */
import Footer from '../Footer';
import CardList from '../CardList';
import {GetMenuList, GetIngredients} from './databaseFunctions'
import Navbar from '../Navbar';
import Loading from '../Loading';
import { menuLinks, buttonText, buttonPath } from '../NavbarData';

function Sides() {
  var menuItems = GetMenuList(13, 25);
  var ingredientsArr = GetIngredients(13, 25);

  if (menuItems.length === 0 || ingredientsArr.length === 0) {
    return <Loading />;
  }

  const cardData = {
    cards: []
  };

  for (let i = 0; i < menuItems.length; i++) {
    /**
     * @type {Object} item - An object containing information about the menu item
     * @property {string} item.image_link - The URL of the image associated with the menu item
     * @property {string} item.menu_item_name - The name of the menu item
     * @property {string} item.menu_item_cost - The cost of the menu item
     */
    const item = menuItems[i];
    /**
     * @type {string[]} ingredientsList - An array of strings representing the ingredients of the menu item
     */
    var ingredientsList = [];
    if(item.menu_item_name === "Salad Bar")
      ingredientsList = [];
    else if(item.menu_item_name === "Sauce")
      ingredientsList = ["x"];
    else
      ingredientsList = ingredientsArr[i];
    /**
     * @type {Object} card - An object containing information about the card to be displayed for the menu item
     * @property {string} card.image - The URL of the image to be displayed for the menu item
     * @property {string} card.text - The name of the menu item to be displayed
     * @property {string} card.label - The cost of the menu item to be displayed
     * @property {string[]} card.ingredients - The ingredients of the menu item to be displayed
     */
    const card = {
      image: item.image_link,
      text: item.menu_item_name,
      label: item.menu_item_cost,
      //path: "",
      ingredients: ingredientsList
    };
    cardData.cards.push(card);
  }

    /* HTML structure*/
    return (<>
    <Navbar links={menuLinks} buttonText={buttonText} buttonPath={buttonPath} />
    <div id="menu">
        <CardList cardData={cardData} title="SIDES & DRINKS" />
    </div>

      <Footer/>
    </>);
  }

  export default Sides;
