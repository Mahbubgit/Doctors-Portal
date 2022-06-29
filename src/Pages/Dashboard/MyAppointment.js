import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import './MyAppointment.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const MyAppointment = () => {
    const [user] = useAuthState(auth);
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/booking?patient=${user.email}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    console.log('res', res);
                    if (res.status === 401 || res.status === 403) {
                        signOut(auth);
                        localStorage.removeItem('accessToken');
                        navigate('/');
                    }
                    return res.json()
                })
                .then(data => {
                    setAppointments(data)
                });
        }
    }, [user])

    // const handleCancelAppointment = () => {
    //     fetch(`http://localhost:5000/delete?patient=${user.email}&date=${appointments.date}$slot=${appointments.slot}&treatment=${appointments.treatment}`)
    //         .then(res => res.json())
    //         .then(data => setAppointments(data));
    // }

    const handleCancelAppointment = id => {
        console.log(id);
        const cancelConfirm = window.confirm('Are you sure to cancel your appointment?');
        if (cancelConfirm) {
            const url = `http://localhost:5000/booking/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    toast('Your appointment is canceled.');
                    const remainingBooking = appointments.filter(appointment => appointment._id !== id);
                    setAppointments(remainingBooking);
                })
        }
    }

    return (
        <div>
            <h2>My Appointments: {appointments.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Treatment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointments.map((a, index) => <tr className='trAppointment'>
                                <td>{index + 1}</td>
                                <td>{a.patientName}</td>
                                <td>{a.date}</td>
                                <td>{a.slot}</td>
                                <td>{a.treatment}</td>
                                <td>
                                    <button onClick={() => handleCancelAppointment(a._id)} className='btn btn-danger mx-auto text-white'>Cancel</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointment;