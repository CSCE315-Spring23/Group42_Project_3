import Footer from '../Footer';
import CardList from '../CardList';
import {GetMenuList, GetIngredients} from './databaseFunctions'
import Navbar from '../Navbar';
import Loading from '../Loading';
import { menuLinks, buttonText, buttonPath } from '../NavbarData';

function Baskets() {
  var menuItems = GetMenuList(5, 6);
  var ingredientsArr = GetIngredients(5, 6);

  if (menuItems.length === 0 | ingredientsArr.length === 0) {
    return <Loading />;
  }

  const cardData = {
    cards: []
  };

  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    const ingr = ingredientsArr[i];
    if (!ingr.includes("Basket Combo")) {
      ingr.push("Basket Combo");
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

    return (<>
    <Navbar links={menuLinks} buttonText={buttonText} buttonPath={buttonPath} />
    <div id="menu">
        <CardList cardData={cardData} title="BASKETS" />
    </div>

      <Footer/>
    </>);
  }

  export default Baskets;
