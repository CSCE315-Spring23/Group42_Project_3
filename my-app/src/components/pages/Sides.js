import Footer from '../Footer';
import CardList from '../CardList';
import {GetMenuList, GetIngredients} from './databaseFunctions'
import Navbar from '../CustomerNavbar';
import Loading from '../Loading';

function Sides() {
  var menuItems = GetMenuList(13, 25);
  var ingredientsArr = GetIngredients(13, 25);

  if (menuItems.length === 0 | ingredientsArr.length === 0) {
    return <Loading />;
  }

  const cardData = {
    cards: []
  };

  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    const card = {
      image: item.image_link,
      text: item.menu_item_name,
      label: item.menu_item_cost,
      //path: "",
      ingredients: []
    };
    cardData.cards.push(card);
  }

    return (<>
    <Navbar />
    <div id="menu">
        <CardList cardData={cardData} title="SIDES" />
    </div>

      <Footer/>
    </>);
  }

  export default Sides;
