import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

//Navbar personalized to fit Employee's View
function EmployeeNavbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  function checkIfManager(){
    document.getElementById("managerViewTab").style.display = 'none';
    // localStorage.setItem('isManager', false)
    const isBooleanTrue = localStorage.getItem('isManager') === 'true';
    if(isBooleanTrue){
      document.getElementById("managerViewTab").style.display = 'unset';
    }
  }

  useEffect(() => {
    showButton();
    checkIfManager();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          <img className = 'navbar-img' src = 'images/Revs-logo.png' alt = "Rev's American Grill"></img>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li id="managerViewTab" className='nav-item'>
              
                <Link to='/ManagerView' className='nav-links' onClick={closeMobileMenu} >
                  ManagerView
                </Link>
              </li>
            <li className='nav-item'>
              <Link to='/EmployeeView' className='nav-links' onClick={closeMobileMenu}>
                OrderAsEmployee
              </Link>
            </li>
            
            
            


            <li>
              <Link
                to='/sign-up'
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

export default EmployeeNavbar;
