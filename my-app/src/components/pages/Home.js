import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import CardList from '../CardList';
import Navbar from '../Navbar';

const cardData = {
  cards: [
    {
      image: "images/burger-img-1.jpg",
      text: "Burgers",
      label: "Label 1",
      path: "/Burgers",
    },
    {
      image: "images/sandwich-img-1.jpg",
      text: "Sandwiches",
      label: "Label 2",
      path: "/Sandwiches",
    },
    {
      image: "images/basket-img-1.jpg",
      text: "Baskets",
      label: "Label 1",
      path: "/Baskets",
    },
    {
      image: "images/side-img-1.jpg",
      text: "Sides",
      label: "Label 1",
      path: "/Sides",
    },
    {
      image: "images/seasonal-img-1.jpg",
      text: "Seasonal",
      label: "Label 1",
      path: "/Seasonal",
    },
  ],
};

function Home() {
  return (<>
    <Navbar />
    <HeroSection />
    <CardList id = 'cards' cardData={cardData} title="Menu" />    
    <Footer />
  </>);
}

export default Home;