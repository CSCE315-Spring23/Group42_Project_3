import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import Navbar from '../Navbar';
import Reports from '../Reports';
import { managerLinks } from '../NavbarData';

/**
 * Renders the page that allows managers to access the database
 * and view reports.
 *
 * @returns {JSX.Element} The JSX code to render the page.
 */
function ManagerDatabaseAccess() {
    return (<> 
        <Navbar type='m' links={managerLinks} buttonText='SIGN OUT' buttonPath='/' />
        <div id="database"></div>
        <Reports/>
        <Footer/>
      </>);
}

export default ManagerDatabaseAccess;
