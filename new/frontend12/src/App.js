import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
// import BoardAdmin from "./components/board-admin.component";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard } = this.state;

    return (
      <div>
        {/* NAVBAR HTML CODE */}
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">Auction Bay</Link>
          <div className="navbar-nav mr-auto">
            {/* !!!!! home needs to be doneee!!! */}
            {/* <li className="nav-item"> <Link to={"/home"} className="nav-link"> Home</Link></li> */}

            {showModeratorBoard && (
              <li className="nav-item"> <Link to={"/mod"} className="nav-link">Moderator Board</Link> </li>
            )}

            {currentUser && (
              <li className="nav-item"> <Link to={"/user"} className="nav-link">User</Link> </li>
            )}
          </div>

          {/* if the user is logged in, then show log out option */}
          {currentUser ? (
            <div className="LogIn-SignUp navbar-nav ml-auto">
              <li className="nav-item"><Link to={"/profile"} className="nav-link">{currentUser.username}</Link></li>
              <li className="nav-item"><a href="/login" className="nav-link" onClick={this.logOut}>Log Out</a></li>
            </div>
          ) : (  
            //if there's no active user, either Log in or Sign up
            <div class="LogIn-SignUp" className="navbar-nav ml-auto">
              <li className="login-class">
                <Link to={"/login"} className="btn btn-outline-light my-2 my-sm-0">Log In</Link></li>

              <li className="nav-item">
                <Link to={"/register"} className="btn btn-outline-light my-2 my-sm-0">Sign Up</Link>
              </li>
            </div>
          )}
        </nav>

        <div className='container-fluid'>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/home' element={<Home/>} />
            <Route path = '/login' element={<Login/>} />
            <Route path = '/register' element={<Register/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/user' element={<BoardUser/>} />
            <Route path='/mod' element={<BoardModerator/>} />
            {/* <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} /> */}
          </Routes>
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */ }
      </div>
    );
  }
}

export default App;
