import Footer from '../Footer';
import CardList from '../CardList';
import { GetMenuList, GetIngredients } from './databaseFunctions';
import Navbar from '../Navbar';
import { menuLinks, buttonText, buttonPath } from '../NavbarData';

/**
 * Represents the Seasonal menu page of a restaurant.
 * @function
 * @returns {JSX.Element} The Seasonal menu page component.
 */
function Seasonal() {
  /**
   * The list of seasonal menu items.
   * @type {Array}
   */
  var menuItems = GetMenuList(27, 10000);
  
  /**
   * The list of ingredients of the seasonal menu items.
   * @type {Array}
   */
  var ingredientsArr = GetIngredients(27, 10000);

  /**
   * Renders a message if there are no seasonal items, otherwise populates a cardData object with the seasonal menu items and their properties.
   * @type {Object}
   * @property {Array} cards - An array of objects, each representing a seasonal menu item card.
   */
  const cardData = {
    cards: []
  };

  if (menuItems.length === 0 || ingredientsArr.length === 0) {
    return <div>Sorry, there are no seasonal items right now!</div>;
  }

  /**
   * Iterates through each seasonal menu item and populates a card object with the corresponding data, which is then pushed to the cardData object.
   */
  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    const card = {
      image: "images/seasonal-img-1.jpg",
      text: item.menu_item_name,
      label: item.menu_item_cost,
      ingredients: []
    };
    cardData.cards.push(card);
  }

  /**
   * Renders the Seasonal menu page.
   * @returns {JSX.Element} The Seasonal menu page component.
   */
  return (
    <>
      <Navbar links={menuLinks} buttonText={buttonText} buttonPath={buttonPath} />
      <div id="menu">
        <CardList cardData={cardData} title="SEASONAL" />
      </div>
      <Footer/>
    </>
  );
}

export default Seasonal;
