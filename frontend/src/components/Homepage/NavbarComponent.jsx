import React, { Component } from 'react';


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
                        <div><a href="#" className="navbar-brand">Auction Bay</a></div>
                        <div class="col-sm-10" align="right">
                            <button class="button" type="button" >Sign Up</button>
                            <button class="btn btn-outline-light my-2 my-sm-0" type="button">Log In</button>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default NavbarComponent;