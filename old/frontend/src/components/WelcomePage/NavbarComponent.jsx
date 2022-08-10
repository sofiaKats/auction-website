import React, { Component } from 'react';
import { Link } from "react-router-dom";

class NavbarComponent extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }
    
    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <div><a href="https://javaguides.net" className="navbar-brand">Auction Bay</a></div>
                        <div class="LogIn-SignUp">
                            <div class="login" >
                                <form> 
                                    <input type="text" placeholder="Username" required />
                                    <input type="password" placeholder="Password" required />
                                    <Link to="/LogIn" class="button">Log In</Link>
                                </form>
                            </div>
                            <Link to="/SignUp" class="btn btn-outline-light my-2 my-sm-0">Sign Up</Link>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }

}

export default NavbarComponent;