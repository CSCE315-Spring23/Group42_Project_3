import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

/**
 * The Navbar component.
 * @param {Array} links - An array of objects representing the links to be displayed in the navbar.
 * Each object should have a 'to' property (representing the link destination) and a 'label' property (representing the link text).
 * @param {string} buttonText - The text to be displayed on the checkout button.
 * @returns {JSX.Element} The rendered Navbar component.
 */
function Navbar({ links, buttonText, buttonPath, type }) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [isManager, setIsManager] = useState(false);
  const [isEmployeeView, setIsEmployeeView] = useState(false);
  const [isManagerView, setIsManagerView] = useState(false);

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
    setIsManager(localStorage.getItem('isManager') === 'true');
    setIsEmployeeView(type === 'e');
    setIsManagerView(type === 'm');
  }, []);

  localStorage.setItem('isManager', true)
  localStorage.setItem('isEmployee', true)

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
            {links.map((link) => (
              <li key={link.to} className='nav-item'>
                <Link
                  to={link.to}
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to={buttonPath}
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                {buttonText}
              </Link>
            </li>
          </ul>
            {isManager && isEmployeeView && <Button path = '/ManagerView' className = "toggle">Switch to Manager View</Button>}
            {isManager && isManagerView && <Button path = '/EmployeeView' className = "toggle">Switch to Employee View</Button>}
            {button && <Button buttonStyle='btn--outline' path={buttonPath}>{buttonText}</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
