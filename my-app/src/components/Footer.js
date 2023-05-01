import React, { useEffect, useState } from "react";
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import Weather from './Weather';
import Popup from "./Popups/Popup";

/*
* Global footer for all pages in our application
* Keeps links to all differnet views including employee and Manager views
* @author
*/
function Footer() {
  const [showPopup, setShowPopup] = useState(false);
  const userData = useState(null);

   useEffect(() => {
     //console.log("Updating user data: " + JSON.stringify(userData));
   }, [userData]);

  //console.log("II: " + JSON.stringify(initialItems));
  function loginClick() {
    //check credentials?
    setShowPopup(true);
  }

  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
            <Button buttonStyle='btn--outline'>Subscribe</Button>
          </form>
        </div>
      </section>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Employee Login</h2>

            <Link onClick={() => {loginClick() }}>Log in</Link>
            {showPopup && <Popup popupStyle={'style2'}/>}
            <Link to='/EmployeeView'>Employee View</Link>
            <Link to='/Menuboard' target="_blank">Menuboard View</Link>
            <Link to='/ManagerView'>Manager View</Link>
          </div>
          <div className='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/Menuboard'>Menuboard View</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Social Media</h2>
            <Link to='/'>Google Translate</Link>
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
        </div>
      </section>
    </div>
  );
}

export default Footer;
