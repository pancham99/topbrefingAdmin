import React from 'react'

const FillterWriters = ({ writers, setWriter }) => {
    return (
        <div className='w-full'>
 <span className='text-gray-800 font-semibold text-sm'>Writer</span>
            <select
              onChange={(e)=>setWriter(e.target.value)}
              className='lg:px-3 w-full py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10'
            >

                <option value="">---select Writer--</option>

                {writers.map((w, i) => (
                    <option key={i} value={w.name}>
                        {w.name}
                    </option>
                ))}

            </select>

        </div>
    )
}

export default FillterWriters