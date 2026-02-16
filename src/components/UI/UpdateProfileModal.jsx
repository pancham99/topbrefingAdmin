import React from 'react';
import ReusableForm from '../ReusableForm/ReusableForm';

const profileFields = [
    { name: 'firstName', label: 'First Name', type: 'text' },
    { name: 'lastName', label: 'Last Name', type: 'text' },
    { name: 'phone', label: 'Phone', type: 'text' },
    {
        name: 'gender', label: 'Gender', type: 'select', options: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Other', value: 'other' }
        ]
    },
    { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
    { name: 'country', label: 'Country', type: 'text' },
    { name: 'city', label: 'City', type: 'text' },
    { name: 'bio', label: 'Bio', type: 'textarea' },
];

const UpdateProfileModal = ({ user, onSubmit, loading, onClose }) => {
    return (
        <div className="fixed  inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className='flex relative flex-col py-4 justify-between items-center w-[540px] bg-white rounded-md'>

                <button
                    onClick={onClose}
                    className="items-end absolute top-4 right-5 w-24  flex justify-end text-red-500 hover:underline"
                >
                    x
                </button>
                <h2 className="text-xl font-bold mb-4">Update Profile</h2>

                <ReusableForm
                    fields={profileFields}
                    initialValues={user}
                    onSubmit={onSubmit}
                    loading={loading}
                />



            </div>

        </div>
    );
};

export default UpdateProfileModal;
