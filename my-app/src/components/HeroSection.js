import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import Weather from './Weather';
// import { useHistory } from 'react-router-dom';

/**
 * Display background video for Home page
 *
 * This component displays a background video with a title and a call-to-action button.
 * It also includes a weather component that displays the current weather information.
 * @returns {JSX.Element} HeroSection component
 */
function HeroSection() {
//   const history = useHistory();

  /**
   * Handle click event for the call-to-action button
   *
   * This function is triggered when the user clicks on the call-to-action button.
   * It can be used to redirect the user to a different page using React Router.
   * @function handleOnClick
   */
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
        {/* <div className='google_translate'>
              <div id="google_translate_element" style={{width: '50%'}}></div>
            </div> */}
      </div>
    </div>
  );
}

export default HeroSection;
