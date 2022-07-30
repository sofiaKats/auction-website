import React, { Component } from 'react';
import NavBar from './NavbarComponent.jsx';
import Footer from './FooterComponent.jsx';

class HomeComponent extends Component {
    render() {
        return (
           <div>
            <NavBar /> 
            <div className='HomePage'>
                
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

export default HomeComponent;
