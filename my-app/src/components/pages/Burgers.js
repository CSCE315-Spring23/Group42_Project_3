import Footer from '../Footer';
import CardList from '../CardList';
import {GetMenuList, GetIngredients} from './databaseFunctions'
import Navbar from '../Navbar';
import { menuLinks, buttonText, buttonPath } from '../NavbarData';
import Loading from '../Loading';

function Burgers() {
  //var myID = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*\s*([^;]*).*$)|^.*$/, "$1");
  //console.log(myID);
  //CreateSession(myID);
  var menuItems = GetMenuList(1, 4);
  var ingredientsArr = GetIngredients(1, 4);

  if (menuItems.length === 0 | ingredientsArr.length === 0) {
    return <Loading />;
  }

  const cardData = {
    cards: []
  };

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

    return (<>
    <Navbar links={menuLinks} buttonText={buttonText} buttonPath={buttonPath} />

    <div id="menu">
        <CardList cardData={cardData} title="BURGERS" />
    </div>

      <Footer/>
    </>);
  }

  export default Burgers;
