import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import Navbar from '../ManagerNavbar';

{/*
* Shows Employee View so they can log in and access features not visible for customers
* @author: 
*/ }

function ManagerView() {
    return (<> 
    <Navbar/>
        <Footer/>
      </>);
}
export default ManagerView