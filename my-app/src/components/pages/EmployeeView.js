import React from 'react';
import Card from '../Cards';
import Footer from '../Footer';
import CardList from '../CardList';

const cardData = {
    cards: [
      {
        image: "path/to/image1",
        text: "testing",
        label: "Label 1",
        path: "/card1",
      },
      {
        image: "path/to/image2",
        text: "testing",
        label: "Label 2",
        path: "/card2",
      },
      {
        image: "path/to/image1",
        text: "Burger 1",
        label: "Label 1",
        path: "/card1",
      },
      {
        image: "path/to/image1",
        text: "Burger 1",
        label: "Label 1",
        path: "/card1",
      },
      {
        image: "path/to/image1",
        text: "Burger 1",
        label: "Label 1",
        path: "/card1",
      },
    ],
  };

function EmployeeView() {
    return (<>
        <div id="employeemenu">
            <CardList cardData={cardData} title="MENU" />
        </div>
        <Footer/>
      </>);
}
export default EmployeeView