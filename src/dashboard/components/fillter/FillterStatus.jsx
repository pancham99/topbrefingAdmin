import React from 'react'

const FillterStatus = ({type_fillter}) => {
    return (
        <div className='w-full '>
            <select onChange={type_fillter} name='' className='lg:px-3 w-full py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' id=''>

                <option value=''>---Select type---</option>
                <option value='pending'>pending</option>
                <option value='active'>active</option>
                <option value='deactive'>deactive</option>
            </select>
        </div>
    )
}

export default FillterStatus