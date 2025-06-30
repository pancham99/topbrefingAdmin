import React from 'react'

const FillterWriters = ({type_fillter_writer, writers}) => {
    return (
        <div className='w-full'>
            <select onChange={type_fillter_writer} name='' className='lg:px-3 w-full py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' id=''>

                <option value="">---select Writer--</option>
                {writers.map((w, i) => <option key={i} value={w.name}>{w.name}</option>)}
            </select>
        </div>
    )
}

export default FillterWriters