import React from 'react';
import { toast } from 'react-toastify';

const DeleteConfirmModal = ({ deletingDoctor, refetch, setDeletingDoctor }) => {
    const { name, email, img } = deletingDoctor;

    const handleDelete = () => {
        fetch(`https://socialist-drake-47567.herokuapp.com/doctor/${email}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.deletedCount) {
                    toast.success(`Doctor ${name} is deleted.`);
                    setDeletingDoctor(null);
                    refetch();

                }
            })
    }

    return (
        <div>
            <input type="checkbox" id="delete-confirm-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-red-500">Are you sure to delete {name}?</h3>
                    <img className='mx-auto' src={img} alt={name} />
                    <div className="modal-action">
                        <button onClick={() => handleDelete(email)} className='btn btn-xs btn-error text-white'>Delete</button>
                        <label for="delete-confirm-modal" className="btn btn-xs">Cancel</label>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DeleteConfirmModal;