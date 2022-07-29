// import logo from './logo.svg';
import './App.css';
import React from 'react';
import NavBar from './components/Homepage/NavbarComponent.jsx';
import Footer from './components/Homepage/FooterComponent.jsx';
import Home from './components/Homepage/HomeComponent.jsx';
import Auth from './components/Homepage/AuthComponent.jsx'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

// this file is where the paths(routes) of each component exist
function App() {
  return (
     <div>  
      <Router>
            <NavBar />
            <div className='container-fluid'>
              <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/Auth' element={<Auth/>} />
              </Routes>
            </div>
          <Footer />
      </Router>
    </div>
  );
}

export default App;
