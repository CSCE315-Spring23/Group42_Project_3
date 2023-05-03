import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import Navbar from '../Navbar';
import { managerLinks } from '../NavbarData';
import Table from '../Table';

/**
 * Represents the Manager View page of the web app, accessible only to managers
 * @return {JSX.Element} Returns the JSX code to display the Manager View page
 * @constructor
 */
function ManagerView() {
  return (
    <>
      <Navbar type='m' links={managerLinks} buttonText='SIGN OUT' buttonPath='/' />
      <Table />
      <Footer />
    </>
  );
}

export default ManagerView;
