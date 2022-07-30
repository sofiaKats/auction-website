import React, { Component } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";

class NavbarComponent extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }
    
    render() {
        const { navigation } = this.props;
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <div><a href="https://javaguides.net" className="navbar-brand">Auction Bay</a></div>
                        <div class="col-sm-10" align="right">
                            <Link to="/SignUp" class="button">Sign up</Link>
                            <Link to="/LogIn" class="btn btn-outline-light my-2 my-sm-0">Log In</Link>
                            {/* <button class="button" type="button" >Sign Up</button> */}
                            {/* <button class="btn btn-outline-light my-2 my-sm-0" type="button">Log In</button> */}
                        </div>
                    </nav>
                </header>
            </div>
        );
    }

}

export default NavbarComponent;