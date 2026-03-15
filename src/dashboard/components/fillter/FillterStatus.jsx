import React from 'react'

const FillterStatus = ({ setStatus }) => {
    return (
        <div className='w-full '>
            <span className='text-gray-800 font-semibold text-sm'>Status</span>
            <select
                onChange={(e) => setStatus(e.target.value)}
                className='lg:px-3 w-full py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10'
            >

                <option value=''>---Select type---</option>
                <option value='pending'>pending</option>
                <option value='active'>active</option>
                <option value='deactive'>deactive</option>

            </select>
        </div>
    )
}

export default FillterStatus