import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import Navbar from '../Navbar';
import Reports from '../Reports';
import { managerLinks } from '../NavbarData';


{/*
* Shows Employee View so they can log in and access features not visible for customers
* @author: 
*/ }

function ManagerDatabaseAccess() {
    return (<> 
        <Navbar links={managerLinks} buttonText= 'SIGN OUT' buttonPath= '/' />
        <div id="database"></div>
        <Reports/>
        <Footer/>
      </>);
}
export default ManagerDatabaseAccess