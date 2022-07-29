// import logo from './logo.svg';
import './App.css';
import React from 'react';
import NavBar from './components/Homepage/NavbarComponent.jsx';
import Footer from './components/Homepage/FooterComponent.jsx';
import Home from './components/Homepage/HomeComponent.jsx';
import LogInComponent from './components/SignUp-LogIn/LogInComponent';
import SignUpComponent from './components/SignUp-LogIn/SignUpComponent';
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
                <Route path = "/LogIn" component = {LogInComponent} />
                <Route path = "/SignUp" component = {SignUpComponent} />
              </Routes>
            </div>
          <Footer />
      </Router>
    </div>
  );
}

export default App;
