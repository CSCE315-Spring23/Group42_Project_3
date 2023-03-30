import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import CardList from '../CardList';

const cardData = {
  cards: [
    {
      image: "images/burger-img-1.jpg",
      text: "Burgers",
      label: "Label 1",
      path: "/Burgers",
    },
    {
      image: "images/burger-img-1.jpg",
      text: "Sandwiches",
      label: "Label 2",
      path: "/Sandwiches",
    },
    {
      image: "images/burger-img-1.jpg",
      text: "Baskets",
      label: "Label 1",
      path: "/Baskets",
    },
    {
      image: "images/burger-img-1.jpg",
      text: "Sides",
      label: "Label 1",
      path: "/Sides",
    },
    {
      image: "images/burger-img-1.jpg",
      text: "Seasonal",
      label: "Label 1",
      path: "/Seasonal",
    },
  ],
};

function Home() {
  return (<>
    <HeroSection />
    <CardList cardData={cardData} title="Menu" />    
    <Footer />
  </>);
}

export default Home;