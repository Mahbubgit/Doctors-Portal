import React from 'react';
import Banner from './Banner';
import Treatment from './Treatment';
import Info from './Info';
import Services from './Services';
import MakeAppointment from './MakeAppointment';
import Testimonials from './Testimonials';
import ContactUs from './ContactUs';
import Footer from './Footer';

const Home = () => {
    return (
        <div className='px-12'>
            <Banner></Banner>
            <Info></Info>
            <Services></Services>
            <Treatment></Treatment>
            <MakeAppointment></MakeAppointment>
            <Testimonials></Testimonials>
            <ContactUs></ContactUs>
            <Footer></Footer>
        </div>
    );
};

export default Home;