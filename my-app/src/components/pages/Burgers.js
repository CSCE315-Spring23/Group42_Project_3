import Footer from '../Footer';
import CardList from '../CardList';
import {GetMenuList, GetIngredients} from './databaseFunctions'
import Navbar from '../CustomerNavbar';
import Loading from '../Loading';

function Burgers() {
  var myID = document.cookie.replace(/(?:(?:^|.*;\s*)sessionId\s*\s*([^;]*).*$)|^.*$/, "$1");
  console.log(myID);
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
        <CardList cardData={cardData} title="BURGERS" />
    </div>

      <Footer/>
    </>);
  }

  export default Burgers;
