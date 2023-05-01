import React, { useState } from 'react';
import { Button } from '../Button';
import { LoginButton } from './LoginButton';
import {GetPassword} from "../pages/databaseFunctions";
import './Popup.css';

function Login({ onClose, popupStyle }) {
  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUserUpdate = (user) => {
    setUserEmail(user);
    setUserPassword(user);
  };
  
  async function loginClick() {
    
    //error here
    await GetPassword(userEmail);
    //console.log(pass);
    console.log(userEmail)
    if (userEmail === 'manager@example.com') {
      // Navigate to manager view page
      localStorage.setItem('isManager', true)
      localStorage.setItem('isEmployee', true)
      
    } else if (userEmail === 'employee@example.com') {
      // Navigate to employee view page
      localStorage.setItem('isManager', false)
      localStorage.setItem('isEmployee', true)

    } else {
      setErrorMessage('Invalid credentials');
    }
  }

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
        <Button onClick={() => { loginClick(); }} buttonSize={'btn--large'} buttonStyle={'btn--outlinee'}>
        {' '}
        Log In
        </Button>
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
