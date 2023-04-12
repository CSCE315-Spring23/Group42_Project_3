import Footer from '../Footer';
import CardList from '../CardList';
import {GetMenuList, GetIngredients} from './databaseFunctions'
import Navbar from '../CustomerNavbar';

/*
* Shows the menuboard for all menu items in Rev's including prices
* @author: ariela
*/
function Sandwiches() {
  var menuItems = GetMenuList(7, 10);
  var ingredientsArr = GetIngredients(7, 10);

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
      //label: "Label 1",
      //path: "",
      ingredients: ingredientsArr[i]
    };
    cardData.cards.push(card);
  }

    /* HTML structure*/ 
    return (<>
    <Navbar />
    <div id="menu">
        <CardList cardData={cardData} title="SANDWICHES" />
    </div>

      <Footer/>
    </>);
  }

  export default Sandwiches;
