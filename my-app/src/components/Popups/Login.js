import React, { useEffect, useState } from 'react';
import { Button } from '../Button';
import { LoginButton } from './LoginButton';
import {GetPassword} from "../pages/databaseFunctions";
import './Popup.css';

/**
 * React component that displays a login form and allows users to log in.
 *
 * @param {function} onClose - Callback function to close the login popup.
 * @param {Object} popupStyle - Style object for the login popup.
 * @returns {JSX.Element} The rendered login component.
 */
function Login({ onClose, popupStyle }) {
  /**
   * State hook that holds the email address entered by the user.
   * 
   * @type {[string, function]} An array containing the current email value and a function to update it.
   */
  const [userEmail, setUserEmail] = useState(null);
  /**
   * State hook that holds the password entered by the user.
   * 
   * @type {[string, function]} An array containing the current password value and a function to update it.
   */
  const [userPassword, setUserPassword] = useState(null);
  /**
   * State hook that holds any error message generated during the login process.
   * 
   * @type {[string, function]} An array containing the current error message value and a function to update it.
   */
  const [errorMessage, setErrorMessage] = useState('');

  const emails = ["seanm@gmail.com", "realDaveC@gmail.com", "thefounder@gmail.com","freshprince@gmail.com", "potus@whitehouse.gov", "millerman@gmail.com", "hobbit@shiremail.com", "myChemBabe@gmail.com", "ultimateTeslaBull@yahoo.com", "mhunt@protonmail.com", "theogswiftie@hotmail.com"];
  const passwords = ["iHateWorkingHere123", "iHateTransInclusiveRadicalFeminism", "iHateMarley", "iHateChrisRock", "iHateDonnieT", "iHateCookieRules", "iHateMagicRings", "iHatePop", "iHateDemocratsUntilINeedEVTaxCredits", "iHateMyName", "iHateJakeGyllenhaal"];
  const managers = [false, true, true, false, false, false, true, false, false, false];
  //console.log("got here")
  //console.log(userEmail)
  /**
   * Callback function to update the state with the user's email and password.
   * 
   * @param {string} user - The email and password entered by the user, separated by a comma.
   * @returns {void}
   */
  const handleUserUpdate = (user) => {
    setUserEmail(user);
    setUserPassword(user);
  };

  const pass = GetPassword("hobbit@shiremail.com");
  //console.log(pass[0].password)
  //const pass = GetPassword("hobbit@shiremail.com");
  /**
   * Async function that handles user login.
   * 
   * @returns {void}
   */  
  function loginClick() {
    var isEmployee = false;
    var isManager = false;
    var password;
    for(let i=0; i<11; i++) {
      if(userEmail===emails[i]) {
        if(userPassword===passwords[i]) {
          if(managers[i]==true) {
            isManager = true;
            break;
          }
          else {
            isEmployee = true;
            break;
          }
        }
        else {
          break;
        }
      }
    }

    console.log(userEmail);
    if (isManager) {
      // Navigate to manager view page
      localStorage.setItem('isManager', true)
      localStorage.setItem('isEmployee', true)
      window.open('/ManagerView')
      
    } else if (isEmployee) {
      // Navigate to employee view page
      localStorage.setItem('isManager', false)
      localStorage.setItem('isEmployee', true)
      window.open('/EmployeeView')
    } else {
      setErrorMessage('Invalid credentials');
    }
  }

  /**
   * Callback function to close the login popup.
   * 
   * @returns {void}
   */
  const handleClose = () => {
    
    window.location.reload();
  };

  return (
    <>
        <div className='loginContent'>Employee Log In</div>
        <input
          className="footer-input xt"
          name="username"
          type="email"
          placeholder="email"
          value={userEmail}
          onChange={(event)=>setUserEmail(event.target.value)}
        />
        <input
          className="footer-input xt"
          name="password"
          type="password"
          placeholder="password"
          value={userPassword}
          onChange={(event)=>setUserPassword(event.target.value)}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div>
        <Button onClick={() => { loginClick(); }} buttonSize={'btn--large'} buttonStyle={'btn--outlinee'}>
        {' '}
        Log In
        </Button>
        </div>
        {/* <div className='loginContent'>Or Sign In with Google</div> */}
        <span className="or">
          <hr />
          <span>OR</span>
          <hr />
        </span>
        <LoginButton className="loginB" onUserUpdate={handleUserUpdate} />
        
      {/* <Button className="close" buttonStyle="btn--outline" onClick={onClose}>
          X
      </Button> */}
    </>
  );
}

export { Login };
