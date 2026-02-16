import React, { useState } from 'react';
import FormField from '../FormField/FormField';

const ReusableForm = ({ fields, initialValues, onSubmit, loading }) => {
    const [values, setValues] = useState(initialValues || {});
    console.log(initialValues,"Initial" );

    const handleChange = (name, value) => {
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(values);
    };

    return (
        <div className=''>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full"
            >
                {fields.map((field) => (
                    <div
                        key={field.name}
                        className={field.fullWidth ? 'md:col-span-2' : ''}
                    >
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {field.label}
                        </label>

                        <FormField
                            field={field}
                            value={values[field.name]}
                            onChange={handleChange}
                        />
                    </div>
                ))}

                {/* Action buttons */}
                <div className="md:col-span-2 flex justify-center gap-3 mt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Update Details'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReusableForm;
