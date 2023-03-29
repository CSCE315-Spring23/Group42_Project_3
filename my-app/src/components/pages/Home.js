import React from 'react';
import '../../App.css';
import Cards from '../Cards';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import CardList from '../CardList';

const cardData = {
  cards: [
    {
      image: "path/to/image1",
      text: "Burgers",
      label: "Label 1",
      path: "/card1",
    },
    {
      image: "path/to/image2",
      text: "Sandwiches",
      label: "Label 2",
      path: "/card2",
    },
    {
      image: "path/to/image1",
      text: "Baskets",
      label: "Label 1",
      path: "/card1",
    },
    {
      image: "path/to/image1",
      text: "Sides",
      label: "Label 1",
      path: "/card1",
    },
    {
      image: "path/to/image1",
      text: "Seasonal",
      label: "Label 1",
      path: "/card1",
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