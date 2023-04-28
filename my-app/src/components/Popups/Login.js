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
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <input
          className="footer-input"
          name="username"
          type="email"
          placeholder="email"
        />
        <input
          className="footer-input"
          name="password"
          type="password"
          placeholder="password"
        />
        <div className='loginContent'>Or Sign In with Google</div>
        <LoginButton className="loginB" onUserUpdate={handleUserUpdate} />
        <Button onClick={handleClose} buttonSize={'btn--large'} buttonStyle={'btn--outlinee'}>
        {' '}
        Log In
        </Button>
      {/* <Button className="close" buttonStyle="btn--outline" onClick={onClose}>
          X
      </Button> */}
    </>
  );
}

export { Login };
