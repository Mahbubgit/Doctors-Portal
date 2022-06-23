import React from 'react';
import appointment from '../../assets/images/appointment.png';
import PrimaryButton from '../Shared/PrimaryButton';
const ContactUs = () => {
    return (
        <section style={{
            background: `url(${appointment})`
        }}
            className='flex justify-center items-center text-center'>
            <div>
                <h4 className='text-xl text-secondary font-bold mt-10'>Contact Us</h4>
                <h2 className='text-4xl text-white my-3'>Stay connected with us</h2>
                <div className='grid grid-cols-1 gap-5 my-10'>
                    <input type="text" placeholder="Email Address" className='input input-bordered w-100' />
                    <input type="text" placeholder="Subject" className='input input-bordered w-100' />
                    <textarea className="textarea textarea-bordered" placeholder="Your message"></textarea>
                </div>
                <div className='capitalize mb-10'>
                    <PrimaryButton>Submit </PrimaryButton>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;