import './App.css';
import React from 'react';
// import Home from './components/Homepage/HomeComponent.jsx';
// import LogInComponent from './components/SignUp-LogIn/LogInComponent';
// import SignUpComponent from './components/SignUp-LogIn/SignUpComponent';
import {BrowserRouter as Router, Route, Routes,  Navigate} from 'react-router-dom';
import HomeComponent from './components/Homepage/HomeComponent.jsx';
import Auth from './components/SignUp-LogIn/Auth'

// this file is where the paths(routes) of each component exist
function App() {
  return (
     <div>  
      <Router>
            <div className='container-fluid'>
              <Routes>
                <Route path='/' element={<HomeComponent/>} />
                <Route path = "/LogIn" element={<Auth/>} />
                <Route path = "/SignUp" element={<Auth/>} />
              </Routes>
            </div>
      </Router>
    </div>
  );
}

export default App;
