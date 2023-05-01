import React, { useEffect, useState } from "react";
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import Weather from './Weather';
import Popup from "./Popups/Popup";

/*
 * Global footer for all pages in our application
 * Keeps links to all different views including employee and Manager views
 * @return {JSX.Element} Footer component
*/
function Footer() {
  const [showPopup, setShowPopup] = useState(false);
  const userData = useState(null);

   useEffect(() => {
     //console.log("Updating user data: " + JSON.stringify(userData));
   }, [userData]);

  /**
  * Function to be executed when login button is clicked
  * @function loginClick
  */
  function loginClick() {
    //check credentials?
    setShowPopup(true);
  }

  return (
    <div className='footer-container'>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <Button buttonStyle='btn--outline'  onClick={() => {loginClick() }}>Employee Login
            {showPopup && <Popup popupStyle={'style2'}/>}</Button>
            <Link to='/EmployeeView'>Employee View</Link>
            <Link to='/Menuboard' target="_blank">Menuboard View</Link>
            <Link to='/ManagerView'>Manager View</Link>
          </div>
          <div className='footer-link-items'>
              <Button buttonStyle='btn--outline' path ='/Menuboard'>Menuboard View</Button>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
              <Button buttonStyle='btn--outline' path = '/'>Google Translate</Button>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
          <Link to='/'>
            <img className = 'footer-img' src = 'images/Revs-logo.png' alt = "Rev's American Grill"></img>
          </Link>
          </div>
          <small className='website-rights'>Rev's © 2020</small>
          <Weather />
          {/* <div id="google_translate_element"></div>
          <script src="https://translate.google.com/translate_a/element.js?
          cb=googleTranslateElementInit"></script>
          <script>
            function googleTranslateElementInit(){
              new google.translate.translateElement(
                {pageLanguage : 'en'},
                'google_translate_element'
              );
            }
          </script> */}
        </div>
      </section>
    </div>
  );
}

export default Footer;
