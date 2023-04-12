import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import Navbar from '../ManagerNavbar';


{/*
* Shows Employee View so they can log in and access features not visible for customers
* @author: 
*/ }

function ManagerDatabaseAccess() {
    return (<> 
        <Navbar />
<div id="database"></div>
        <Footer/>
      </>);
}
export default ManagerDatabaseAccess