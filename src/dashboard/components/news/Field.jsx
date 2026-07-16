import React from 'react'

const Field = ({ label, hint, required, children }) => (
  <div className='flex flex-col gap-1.5 mb-5'>
    <div className='flex items-center justify-between'>
      <label className='text-sm font-medium text-gray-700'>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      {hint && <span className='text-xs text-gray-400'>{hint}</span>}
    </div>
    {children}
  </div>
)

export default Field

