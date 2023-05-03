import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import Navbar from '../Navbar';
import { menuLinks, buttonText, buttonPath } from '../NavbarData';

/**
 * Renders the home page of the web app with main order options for customers.
 * @returns {JSX.Element} Home component elements.
 * @example
 * <Home />
 */
function Home() {
  return (
    <>
      <Navbar links={menuLinks} buttonText={buttonText} buttonPath={buttonPath} />
      <HeroSection />
      <Footer />
    </>
  );
}

export default Home;
