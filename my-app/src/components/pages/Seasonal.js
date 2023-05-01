import Footer from '../Footer';
import CardList from '../CardList';
import {GetMenuList, GetIngredients} from './databaseFunctions'
import Navbar from '../Navbar';
import { menuLinks, buttonText, buttonPath } from '../NavbarData';

function Seasonal() {
  var menuItems = GetMenuList(27,10000);
  var ingredientsArr = GetIngredients(27,10000);

  if (menuItems.length === 0 || ingredientsArr.length === 0) {
    return <div>Sorry, there are no seasonal items right now!</div>;
}

  const cardData = {
    cards: []
  };

  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    const card = {
      image: "images/seasonal-img-1.jpg",
      text: item.menu_item_name,
      label: item.menu_item_cost,
      //path: "",
      ingredients: []
    };
    cardData.cards.push(card);
  }

    return (<>
    <Navbar links={menuLinks} buttonText={buttonText} buttonPath={buttonPath} />
    <div id="menu">
        <CardList cardData={cardData} title="SEASONAL" />
    </div>

      <Footer/>
    </>);
  }

  export default Seasonal;
