import React from 'react';
import logo from './assets/img/logo.jpg'
import './style.css'
function LandingPage(props) {
    return (
        <div className='head-bar'>
            <nav>
                <h2 className='logo'>Rid<span>Dimz</span></h2>
                {/* <img className='logo' src={logo} alt="logo" /> */}
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Service</a></li>
                    <li><a href="#">Portfolio</a></li>
                    <li><a href="#">Contact Us</a></li>
                </ul>
                <button type='button '>Connect</button>
            </nav>
        </div>
    );
}
export default LandingPage;