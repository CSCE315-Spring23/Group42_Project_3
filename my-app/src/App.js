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

//Main App documentation with all the different pages available
function App() {
  return (
    <>
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
