import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import Navbar from '../Navbar';
import { menuLinks, buttonText, buttonPath } from '../NavbarData';

/*
* Shows Home page of the web app with main order options for customers
* @author:
*/


//<CardList id = 'cards' cardData={cardData} title="Menu" />
/* HTML structure*/ 
function Home() {
  return (<>
    <Navbar links={menuLinks} buttonText={buttonText} buttonPath={buttonPath} />
    <HeroSection />
    <Footer />
  </>);
}

export default Home;
