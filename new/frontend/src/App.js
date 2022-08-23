import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
// import BoardModerator from "./components/BoardModerator";
import ManageAuctions from "./components/ManageAuctions";
import BoardAdmin from "./components/BoardAdmin";
import UserInfo from "./components/UserInfo";
import CreateAuction from "./components/CreateAuction";

import EventBus from "./common/EventBus";

const App = () => {
  // const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      // setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    // setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">Auction Bay</Link>
        <div className="navbar-nav mr-auto">
          {/* mporei kai na to kaneis delete auto */}
          {/* <li className="nav-item"> <Link to={"/home"} className="nav-link"> Home </Link> </li> */}

          {showAdminBoard && (
            <li className="nav-item"> <Link to={"/admin"} className="nav-link"> Admin Board </Link> </li>
          )}

          {currentUser && (
            <li className="nav-item"> <Link to={"/frontpage"} className="nav-link"> Front Page </Link> </li>
          )}
        </div>

          {/* an 8eleis na exei ksexwrista page o ka8enas tote edw!! px
          na exei ena page o user pou na mhn exei o admin kai antistrofa, 
          currentUser && showAdminBoard ? (...) <--auto shmainei oti einai o admin */}
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">  <Link to={`/manageauctions/${currentUser.id}`} className="nav-link"> Manage Auctions </Link> </li>
            <li className="nav-item">  <Link to={"/profile"} className="nav-link"> {currentUser.username} </Link> </li>
            <li className="nav-item"> <a href="/login" className="nav-link" onClick={logOut}>Log Out  </a> </li>
          </div>
        ) : (
          <div className="navbar-nav navbar-nav-custom ml-auto">
            <li className="login-class">
              <Link to={"/login"} className="btn btn-outline-light my-2 my-sm-0">Log In</Link> </li>

            <li className="nav-item">
              <Link to={"/register"} className="btn btn-outline-light my-2 my-sm-0">Sign Up</Link> </li>
          </div>
        )}
      </nav>

      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/frontpage" element={<BoardUser/>} />
          <Route path="/manageauctions/:id" element={<ManageAuctions/>} />
          <Route path="/admin" element={<BoardAdmin/>} />
          <Route path="/userinfo/:id" element={<UserInfo/>} />
          <Route path="/add-auction/:id" element={<CreateAuction/>} />
        </Routes>
      </div>

    </div>
  );
};

export default App;
