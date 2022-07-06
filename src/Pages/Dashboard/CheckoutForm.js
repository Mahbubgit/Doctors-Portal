import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { async } from '@firebase/util';
import { success } from 'daisyui/src/colors';

const CheckoutForm = ({ appointment }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const { _id, price, patient, patientName } = appointment;

    useEffect(() => {
        fetch('https://socialist-drake-47567.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                }
            });
    }, [price])
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        //   if(error){
        //     setCardError(error.message);
        //   }
        //   else{
        //     setCardError('');
        //   }
        setCardError(error?.message || '');
        setSuccess('');
        setProcessing(true);

        // Confirm Card Payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patientName,
                        email: patient
                    },
                },
            },
        );
        if (intentError) {
            setCardError(intentError?.message);
            setProcessing(false);
        }
        else {
            setCardError('');
            setTransactionId(paymentIntent.id);
            console.log(paymentIntent);
            setSuccess('Congrats! Your payment is completed.')
            // store payment on database
            const payment = {
                appointment: _id,
                transactionId: paymentIntent.id
            }
            fetch(`https://socialist-drake-47567.herokuapp.com/booking/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({ payment })
            })
                .then(res => res.json())
                .then(data => {
                    setProcessing(false);
                    console.log(data);
                })
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-success btn-sm mt-4 text-white' type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
            {
                cardError && <p className='text-red-700'>{cardError}</p>
            }
            {
                success && <div className='text-green-700'>
                    <p>{success}</p>
                    <p>Your transaction ID: <span className='text-orange-500 font-bold'>{transactionId}</span></p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;