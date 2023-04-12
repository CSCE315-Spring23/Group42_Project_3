import Footer from '../Footer';
import CardList from '../CardList';
import {GetMenuList, GetIngredients} from './databaseFunctions'
import Navbar from '../CustomerNavbar';


function Seasonal() {
  var menuItems = GetMenuList(26, 26);
  var ingredientsArr = GetIngredients(26, 26);

  if (menuItems.length === 0 | ingredientsArr.length === 0) {
    return <div>Loading...</div>;
  }

  const cardData = {
    cards: []
  };

  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    const card = {
      image: item.image_link,
      text: item.menu_item_name,
      //label: "Label 1",
      //path: "",
      ingredients: ingredientsArr[i]
    };
    cardData.cards.push(card);
  }

    return (<>
    <Navbar />
    <div id="menu">
        <CardList cardData={cardData} title="SEASONAL" />
    </div>

      <Footer/>
    </>);
  }

  export default Seasonal;
