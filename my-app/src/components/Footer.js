import React, { useEffect, useState } from "react";
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import Weather from './Weather';
import {LoginButton} from './LoginButton';

/*
* Global footer for all pages in our application
* Keeps links to all differnet views including employee and Manager views
* @author
*/
function Footer() {
  const [showPopup, setShowPopup] = useState(false);
  const [userData, setUserData] = useState(null);

   const handleUserUpdate = (user) => {
     setUserData(user);
   }

   useEffect(() => {
     //console.log("Updating user data: " + JSON.stringify(userData));
   }, [userData]);

  //console.log("II: " + JSON.stringify(initialItems));
  function loginClick() {
    //check credentials?
    setShowPopup(true);
  }

  const handleClose = () => {
    console.log("Google user logging in: " + JSON.stringify(userData));
    console.log("Google user logging in: " +userData.email);
    if(true) {//userData.email or the email from the input field are in the database as manager) {
      //navigate to managerview page
    } else if (true) { //userdata.email or email from input are in db as employee
      //navigate to employeeview page
    } else {
      //print some error message that says credentials not found
    }
    setShowPopup(false);
  }

  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Join the Rev's newsletter to receive our best deals and menu updates!
        </p>
        <p className='footer-subscription-text'>
          You can unsubscribe at any time.
        </p>
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
            {showPopup &&
              <div className="popup">
                <div className="login-content">
                  <h2>Log In</h2>
                    <input
                      className='footer-input'
                      name='username'
                      type='email'
                      placeholder='email'
                    />
                    <input
                      className='footer-input'
                      name='password'
                      type='password'
                      placeholder='password'
                    />
                  <h2>Or sign in with Google</h2>
                  <LoginButton className = "loginB" onUserUpdate={handleUserUpdate}/>
                  <Button onClick={handleClose}><Link style={{ color: 'white', textDecoration: 'none' }}>
                  Log In
                  </Link></Button>
                </div>
              </div>
            }
            <Link to='/EmployeeView'>Employee View</Link>
            <Link to='/Menuboard' target="_blank">Menuboard View</Link>
            <Link to='/ManagerView'>Manager View</Link>
          </div>
          <div className='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/Menuboard'>Menuboard View</Link>
            {/* <Link to='/'>Contact</Link>
            <Link to='/'>Support</Link>
            <Link to='/'>Terms of Service</Link> */}
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Social Media</h2>
            <Link to='/'>Google Translate</Link>
            {/* <Link to='/'>Instagram</Link>
            <Link to='/'>Facebook</Link>
            <Link to='/'>Youtube</Link>
            <Link to='/'>Twitter</Link> */}
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            {/* <Link to='/' className='social-logo'>
              Rev's
              <i className='fab fa-typo3' />
            </Link> */}
          <Link to='/'>
            <img className = 'footer-img' src = 'images/Revs-logo.png' alt = "Rev's American Grill"></img>
          </Link>
          </div>
          <small className='website-rights'>Rev's © 2020</small>
          <Weather />
        </div>
        {/* <LoginButton /> */}

      </section>
    </div>
  );
}

export default Footer;
