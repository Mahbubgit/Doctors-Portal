import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading';

const AddDoctor = () => {
    /**
     * 3 ways to store images
     * 1. Third party storage // Free open public storage is ok for Practice Project
     * 2. Your own storage in your own server (file system)
     * 3. Database: MongoDB
     * 
     * YUP: to validate image file. search by Yup file validation for react hook form
     */
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const { data: services, isLoading } = useQuery('services', () => fetch('https://socialist-drake-47567.herokuapp.com/service').then(res => res.json()));
    const imageStorageKey = '8be01473d7fc1567a492620a31b4d0fc';

    const onSubmit = async data => {
        // console.log('data', data);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);

        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        img: img
                    }
                    // send to your database
                    fetch('https://socialist-drake-47567.herokuapp.com/doctor', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                    .then(res => res.json())
                    .then(inserted =>{
                        // console.log('doctor', inserted);
                        if(inserted.insertedId){
                            toast.success('Doctor added successfully');
                            reset();
                        }
                        else{
                            toast.error('Failed to add the doctor');
                        }
                    })
                }
                // console.log('imgbb', result);
            })
    };

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className='text-2xl'> Add a New Doctor</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-control mx-auto w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="input input-bordered w-full max-w-xs"
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'Name is Required'
                            }
                        }
                        )}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-600">{errors.name.message}</span>}
                    </label>
                </div>

                <div className="form-control mx-auto w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="input input-bordered w-full max-w-xs"
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'Email is Required'
                            },
                            pattern: {
                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                message: 'Invalid Email'
                            }
                        }
                        )}
                    />
                    <label className="label">
                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-600">{errors.email.message}</span>}
                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-600">{errors.email.message}</span>}
                    </label>
                </div>

                <div className="form-control mx-auto w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Specialty</span>
                    </label>
                    <select {...register('specialty')} className="select input-bordered w-full max-w-xs">
                        {
                            services.map(service => <option
                                key={service._id}
                                value={service.name}
                            >{service.name}</option>)
                        }
                    </select>
                </div>

                <div className="form-control mx-auto w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input
                        type="file"
                        className="input input-bordered w-full max-w-xs"
                        {...register("image", {
                            required: {
                                value: true,
                                message: 'image is Required'
                            }
                        }
                        )}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-600">{errors.name.message}</span>}
                    </label>
                </div>

                <input className='btn w-full max-w-xs' type="submit" value="Add" />
            </form>
        </div>
    );
};

export default AddDoctor;