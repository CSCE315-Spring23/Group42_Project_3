import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

/**
 * The Navbar component.
 * @returns {JSX.Element} The rendered Navbar component.
 */
function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  /**
   * Toggles the click state.
   */
  const handleClick = () => setClick(!click);

  /**
   * Closes the mobile menu.
   */
  const closeMobileMenu = () => setClick(false);

  /**
   * Sets the button state based on the window's width.
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
              <Link
                to='/Burgers'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Burgers
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/Sandwiches'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Sandwiches
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/Baskets'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Baskets
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/Sides'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Sides & Drinks
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/Seasonal'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Seasonal
              </Link>
            </li>

            <li>
              <Link
                to='/Checkout'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Checkout
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline' path='/checkout'>CHECK OUT</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
