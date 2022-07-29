import React, { Component } from 'react';
// import { withParamsAndNavigate } from "./getParamsAndNavigate.js";
import { useNavigate } from 'react-router-dom';

class NavbarComponent extends Component {
    constructor(props) {
        super(props)
        // const navigate = useNavigate();

        this.state = {
                 
        }
        this.SignUp = this.SignUp.bind(this);
    }

    SignUp() {
        // this.props.history.push('/SignUp');
        // navigate('/SignUp');
    }
    
    render() {
        const{params,navigate} = this.props;
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <div><a href="https://javaguides.net" className="navbar-brand">Auction Bay</a></div>
                        <div class="col-sm-10" align="right">
                            <button class="button" type="button"onClick={this.SignUp} >Sign Up</button>
                            <button class="btn btn-outline-light my-2 my-sm-0" type="button">Log In</button>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default NavbarComponent;
