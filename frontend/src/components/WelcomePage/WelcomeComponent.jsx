import React, { Component } from 'react';
import NavBar from './NavbarComponent.jsx';
import Footer from './FooterComponent.jsx';

class WelcomeComponent extends Component {
    render() {
        return (
           <div>
            <NavBar /> 
            <div className='WelcomePage'>
                
                <p>Ultimate Trading Experience</p>
                <span>
                    <h2>Simple. Free. A fast, and scalable platform to sell or buy products. We use the latest technology so that you can easily and conveniently bid in auctions across the world from the comfort of your own home.</h2>
                </span>
            </div>
            <Footer />
           </div>
        );
    }
}

export default WelcomeComponent;
