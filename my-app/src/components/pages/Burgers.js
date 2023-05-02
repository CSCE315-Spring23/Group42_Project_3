/**
 *
 * React component that renders a list of burgers using CardList component, Navbar, and Footer.
 * @function
 * @returns {JSX.Element} - Rendered component.
*/
import Footer from '../Footer';
import CardList from '../CardList';
import { GetMenuList, GetIngredients } from './databaseFunctions'
import Navbar from '../Navbar';
import { menuLinks, buttonText, buttonPath } from '../NavbarData';
import Loading from '../Loading';

/**
 *
 * Get the list of menu items and ingredients from the database.
 * @function
 * @returns {array} - An array of menu items.
 */
function Burgers() {
  var menuItems = GetMenuList(1, 4);
  var ingredientsArr = GetIngredients(1, 4);
  /**
  
  Check if the menu items or ingredients are empty, and if so, display a loading spinner.
  @function
  @returns {JSX.Element} - A loading spinner component.
  */
  if (menuItems.length === 0 | ingredientsArr.length === 0) {
    return <Loading />;
  }
  /**
  
  Create an array of card objects to pass to the CardList component.
  @const
  @type {object}
  @property {array} cards - An array of card objects.
  */
  const cardData = {
    cards: []
  };
  /**
  
  Loop through the menu items and ingredients arrays to create a card object for each menu item.
  @function
  */
  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    const ingr = ingredientsArr[i];
    if (!ingr.includes("Combo")) {
      ingr.push("Combo");
    }
    const card = {
      image: item.image_link,
      text: item.menu_item_name,
      label: item.menu_item_cost,
      //path: "",
      ingredients: ingr
    };
    cardData.cards.push(card);
  }
  /**
  
  Render the Navbar, CardList, and Footer components.
  @returns {JSX.Element} - The rendered component.
  */
  return (<>
    <Navbar links={menuLinks} buttonText={buttonText} buttonPath={buttonPath} />

    <div id="menu">
      <CardList cardData={cardData} title="BURGERS" />
    </div>

    <Footer />
  </>);
}

export default Burgers;
