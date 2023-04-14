import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import Navbar from '../CustomerNavbar';

/*
* Shows Home page of the web app with main order options for customers
* @author:
*/


//<CardList id = 'cards' cardData={cardData} title="Menu" />
/* HTML structure*/ 
function Home() {
  return (<>
    <Navbar />
    <HeroSection />
    <Footer />
  </>);
}

export default Home;
