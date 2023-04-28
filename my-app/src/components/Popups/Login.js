import React, { useState } from 'react';
import { Button } from '../Button';
import { LoginButton } from './LoginButton';
import './Popup.css';

function Login({ onClose, popupStyle }) {
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUserUpdate = (user) => {
    setUserData(user);
  };

  const handleClose = () => {
    if (userData && userData.email === 'manager@example.com') {
      // Navigate to manager view page
    } else if (userData && userData.email === 'employee@example.com') {
      // Navigate to employee view page
    } else {
      setErrorMessage('Credentials not found');
    }
  };

  return (
    <>
        <div className='loginContent'>Login</div>
        <input
          className="footer-input xt"
          name="username"
          type="email"
          placeholder="email"
        />
        <input
          className="footer-input xt"
          name="password"
          type="password"
          placeholder="password"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <Button onClick={handleClose} buttonSize={'btn--large'} buttonStyle={'btn--outlinee'}>
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
