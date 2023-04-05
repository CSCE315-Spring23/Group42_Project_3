import Footer from '../Footer';
import CardList from '../CardList';
import {GetMenuList, GetIngredients} from './databaseFunctions'
import Navbar from '../CustomerNavbar';

/* 
* Display the different burger type when making a customer order
* @author Daniela Santos
*/
function Burgers() {
  var menuItems = GetMenuList(1, 4);
  var ingredientsArr = GetIngredients(1, 4);

  if (menuItems.length === 0 | ingredientsArr.length === 0) {
    return <div>Loading...</div>;
  }

  const cardData = {
    cards: []
  };

  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    const card = {
      image: "images/burger-img-1.jpg",
      text: item.menu_item_name,
      //label: "Label 1",
      //path: "",
      ingredients: ingredientsArr[i]
    };
    cardData.cards.push(card);
  }


    /*HTML output with global footer */
    return (<>
    <Navbar />
    <div id="menu">
        <CardList cardData={cardData} title="BURGERS" />
    </div>

      <Footer/>
    </>);
  }

  export default Burgers;
