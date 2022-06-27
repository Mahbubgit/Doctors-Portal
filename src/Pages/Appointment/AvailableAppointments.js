import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import BookingModal from './BookingModal';
import Service from './Service';

const AvailableAppointments = ({ date }) => {
    const [treatment, setTreatment] = useState(null);
    
    const formattedDate = format(date, 'PP');
    
    // const [services, setServices] = useState([]);
    // useEffect(() => {
    //     // fetch('services.json')
    //     // fetch('http://localhost:5000/service')
    //     fetch(`http://localhost:5000/available?date=${formattedDate}`)
    //         .then(res => res.json())
    //         .then(data => setServices(data));
    // }, [formattedDate])

    const {data: services, isLoading, refetch } = useQuery(['available', formattedDate], () =>
    fetch(`http://localhost:5000/available?date=${formattedDate}`)
             .then(res => res.json())
    )
    if(isLoading){
        return <Loading></Loading>
    }
//     const { isLoading, error, data } = useQuery('repoData', () =>
//      fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res =>
//        res.json()
//      )
//    )

    return (
        <div>
            <h4 className='text-xl text-secondary text-center my-10'>Available Appointments on {format(date, 'PP')}</h4>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    services?.map(service => <Service
                            key={service._id}
                            service={service}
                            setTreatment={setTreatment}
                    ></Service>)
                }
            </div>
            {treatment && <BookingModal 
            date={date} 
            treatment={treatment}
            setTreatment={setTreatment}
            refetch={refetch}
            ></BookingModal>}
        </div>
    );
};

export default AvailableAppointments;