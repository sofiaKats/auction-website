import './App.css';
import React from 'react';
import LogInComponent from './components/SignUp-LogIn/LogInComponent';
import SignUpComponent from './components/SignUp-LogIn/SignUpComponent';
import {BrowserRouter as Router, Route, Routes,  Navigate} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import WelcomeComponent from './components/WelcomePage/WelcomeComponent.jsx';

// this file is where the paths(routes) of each component exist
function App() {
  return (
     <div>  
      <Router>
            <div className='container-fluid'>
              <Routes>
                <Route path='/' element={<WelcomeComponent/>} />
                <Route path = "/LogIn" element={<LogInComponent/>} />
                <Route path = "/SignUp" element={<SignUpComponent/>} />
              </Routes>
            </div>
      </Router>
    </div>
  );
}

export default App;
