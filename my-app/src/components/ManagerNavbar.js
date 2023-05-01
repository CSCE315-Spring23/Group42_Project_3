import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

/**
  * Navbar component displaying a navigation bar with links to different pages for the Manager
  * @function Navbar
  * @returns {JSX.Element} Navbar component
*/
function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  /**
  * Closes the mobile menu.
  * @function closeMobileMenu
  */
  const handleClick = () => setClick(!click);

  /**
  * Closes the mobile menu.
  * @function closeMobileMenu
  */
  const closeMobileMenu = () => setClick(false);

  /**
  * Shows the sign out button if the window is wide enough.
  * @function showButton
  */
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <img className='navbar-img' src='images/Revs-logo.png' alt="Rev's American Grill"></img>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/ManagerView' className='nav-links' onClick={closeMobileMenu}>
                View and Edit Database
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/ManagerDatabaseAccess'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Reports
              </Link>
            </li>
            {/* <li className='nav-item'>
            <Link
              to='/Menu'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Database Access and Edit
              </Link>
            </li> */}
            {button && <Button buttonStyle='btn--outline' path=''>SIGN OUT</Button>}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
