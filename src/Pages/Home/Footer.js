import React from 'react';
import footer from '../../assets/images/footer.png';
import copyright from '../../assets/images/copyright.png';
import { Link } from 'react-router-dom';

const Footer = () => {
    const today = new Date();
    const year = today.getFullYear();

    return (
        <footer style={
            {
                background: `url(${footer})`,
                backgroundSize: 'cover'
            }
        } className="p-10">
            <div className='footer'>
                <div>
                    <span className="footer-title">Services</span>
                    <Link to="/a">Emergency Checkup</Link>
                    <Link to="/a">Monthly Checkup</Link>
                    <Link to="/a">Weekly Checkup</Link>
                    <Link to="/a">Deep Checkup</Link>
                </div>
                <div>
                    <span className="footer-title">Oral Health</span>
                    <Link to="/a">Fluoride Treatment</Link>
                    <Link to="/a">Cavity Filling</Link>
                    <Link to="/a">Teath Whitening</Link>
                </div>
                <div>
                    <span className="footer-title">Our Address</span>
                    <p>New York- 101010 Hudson</p>
                </div>
            </div>
            <div className='my-10'>
                <p className='flex justify-center'>Copyright <img className='mx-2' width={25} src={copyright} alt="" /> {year} - All Right Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;