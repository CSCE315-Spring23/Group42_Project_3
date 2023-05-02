import React, { useEffect, useState } from "react";
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import Weather from './Weather';
import Popup from "./Popups/Popup";
import GoogleTranslate from "./Translate";

/**
 * React functional component representing the global footer for all pages in our application.
 * It keeps links to all different views including employee and Manager views.
 * @returns {JSX.Element} Footer component
 */
function Footer() {
  /**
   * React state hook to handle showing/hiding a popup.
   * @type {[boolean, function]} showPopup - the state variable and its update function
   */
  const [showPopup, setShowPopup] = useState(false);

  /**
   * React state hook to store user data.
   * @type {[null, function]} userData - the state variable and its update function
   */
  const userData = useState(null);

  /**
   * React effect hook that gets called when userData changes.
   */
  useEffect(() => {
    // console.log("Updating user data: " + JSON.stringify(userData));
  }, [userData]);

  /**
   * Function to be executed when login button is clicked.
   */
  function loginClick() {
    // check credentials?
    setShowPopup(true);
  }

  return (
    <div className='footer-container'>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            {/* Button to open popup */}
            <Button
              buttonStyle='btn--outline'
              onClick={() => { loginClick() }}
            >
              Employee Login
              {showPopup && <Popup popupStyle={'style2'} />}
            </Button>
            {/* Link to EmployeeView */}
            <Link to='/EmployeeView'>Employee View</Link>
            {/* Link to MenuboardView (opens in new tab) */}
            <Link to='/Menuboard' target='_blank'>Menuboard View</Link>
            {/* Link to ManagerView */}
            <Link to='/ManagerView'>Manager View</Link>
          </div>
          <div className='footer-link-items'>
            {/* Button to navigate to MenuboardView */}
            <Button buttonStyle='btn--outline' path='/Menuboard'>
              Menuboard View
            </Button>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            {/* TODO: Uncomment when GoogleTranslate component is implemented */}
            {/* <GoogleTranslate /> */}
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            {/* Link to home page */}
            <Link to='/'>
              <img className='footer-img' src='images/Revs-logo.png' alt="Rev's American Grill" />
            </Link>
          </div>
          {/* Small text showing website rights */}
          <small className='website-rights'>Rev's © 2020</small>
          {/* Weather component */}
          <Weather />
        </div>
      </section>
    </div>
  );
}

export default Footer;
