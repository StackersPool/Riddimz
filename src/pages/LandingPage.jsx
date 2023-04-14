import React from 'react';
import logo from './assets/img/logo.jpg'
import image1 from './assets/images/slider-img.jpg'

// Stylers
import './assets/css/style.css'
import './assets/css/styler.css'

function LandingPage(props) {
    return (
        <div className='container'>
            {/* Header */}
            <nav>
                {/* <h2 className='logo'>Rid<span>Dimz</span></h2> */}
                <img className='logo' src={logo} alt="logo" />
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Docs</a></li>
                    {/* <li><a href="#">Service</a></li>
                    <li><a href="#">Portfolio</a></li> */}
                    <li><a href="#">Contact Us</a></li>
                </ul>
                <button type='button '>Connect</button>
            </nav>
            {/* Content */}<br />
            <div className='content'>
                <div class="row">
                    <h1>Welcome to RID<span>DIMZ</span></h1>
                </div>
            </div>
            <div className='content'>
                <div class="row">
                    <h4>Your first <span>Web3</span> karaoke platform on the Stacks blockchain,
                        <br /><br />sing, socialize, and enjoy the benefits of decentralized technology.
                        <br /><br />Join our community and experience the future of entertainment.
                        <br /><br /><button type='button '>Join</button>
                    </h4>
                </div>
            </div>
            {/* Footer */}
            <footer>
                All rights reserved. Copyright © 2023 Riddimz.
            </footer>
        </div>
    );
}
export default LandingPage;