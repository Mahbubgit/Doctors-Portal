import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51LIFnbHZwCB43McyiuTRF7CGtPhnV0gJwbIM8hgif6xJfQYQYC4kuy2XE62MhiaMRwY1B9tqkiwma1c1uw2qE3H500e53tE6vf');


const Payment = () => {
    const { id } = useParams();
    const url = `https://socialist-drake-47567.herokuapp.com/booking/${id}`;

    const { data: appointment, isLoading } = useQuery(['booking', id], () => fetch(url, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }

    return (

        <div>
            <div className="mx-auto card w-50 max-w-md bg-base-200 shadow-2xl my-12">
                <div className="card-body items-center text-center">
                    <p className='text-primary font-bold'>Hello, {appointment.patientName}</p>
                    <h2 className="card-title">Please pay for {appointment.treatment}: ${appointment.price}</h2>
                    <p>Your appointment: <span className='text-orange-700'>{appointment.date} </span> at <span className='text-purple-700'>{appointment.slot}</span></p>
                </div>
            </div>
            <div className="mx-auto card w-50 max-w-md shadow-2xl bg-base-200">
                <div className="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm appointment={appointment} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;