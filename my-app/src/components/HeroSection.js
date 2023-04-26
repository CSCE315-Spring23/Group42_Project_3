import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import Weather from './Weather';
// import { useHistory } from 'react-router-dom';

/*
*Display background video for Home page
*
*/
function HeroSection() {
//   const history = useHistory();

  const handleOnClick = () => {
    // history.push('/');
  };

  return (
    <div className='hero-container'>
      <video src='video-1.mp4' autoPlay loop muted />
      <h1>Rev's</h1>
      <p>American Grill</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          onClick={handleOnClick}
          path='/Menu'
        >
          GET STARTED
        </Button>
        <Weather/>
      </div>
    </div>
  );
}

export default HeroSection;
