import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import Navbar from '../Navbar';
import { managerLinks, signOutText, signOutPath } from '../NavbarData';
import Table from '../Table';

{/*
* Shows Employee View so they can log in and access features not visible for customers
* @author: 
*/ }

function ManagerView() {
    return (<> 
    <Navbar links={managerLinks} buttonText= 'SIGN OUT' buttonPath= '/' />
    <Table/>
        <Footer/>
      </>);
}
export default ManagerView