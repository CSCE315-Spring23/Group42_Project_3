import React from 'react';
// import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import Burgers from './components/pages/Burgers';
import Menu from './components/pages/Menu';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sandwiches from './components/pages/Sandwiches';
import Baskets from './components/pages/Baskets';
import Sides from './components/pages/Sides';
import Seasonal from './components/pages/Seasonal';
import Checkout from './components/pages/Checkout';
import EmployeeView from './components/pages/EmployeeView';
import MenuBoard from './components/pages/Menuboard';
import ManagerView from './components/pages/ManagerView';
import ManagerDatabaseAccess  from './components/pages/ManagerDatabaseAccess';

import jwt_decode from "jwt-decode";
import {useEffect} from 'react';

//Main App documentation with all the different pages available
function App() {
  function handleCallbackResponse(response) {
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
  }

  useEffect(()=> {
    /* global google */
    google.accounts.id.initialize({client_id: "351186300287-tmd28ore2cgjrc3j3mjcmrr29mel2ssa.apps.googleusercontent.com",
    callback: handleCallbackResponse});

    google.accounts.id.renderButton(
      document.getElementById("signIn"),
      {theme: "outline", size: "large"}
    );
  }, []);

  return (
    <>
      <div className = "App">
        <div id="signIn"></div>
      </div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/Burgers' element={<Burgers/>} />
          <Route exact path='/Menu' element={<Menu/>} />
          <Route exact path='/Sandwiches' element={<Sandwiches/>} />
          <Route exact path='/Baskets' element={<Baskets/>} />
          <Route exact path='/Sides' element={<Sides/>} />
          <Route exact path='/Seasonal' element={<Seasonal/>} />
          <Route exact path='/Checkout' element={<Checkout/>} />
          <Route exact path='/Menuboard' element={<MenuBoard/>} />
          <Route exact path='/EmployeeView' element={<EmployeeView/>} />
          <Route exact path='/ManagerView' element={<ManagerView/>} />
          <Route exact path='/ManagerDatabaseAccess' element={<ManagerDatabaseAccess/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
