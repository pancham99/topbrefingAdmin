import React from "react";

const FilterDate = ({ value, onChange, placeholder }) => {
  return (
    <div className="w-full">
         <span className='text-gray-800 font-semibold text-sm'>{placeholder}</span>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="lg:px-3 w-full py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10"
        placeholder={placeholder}
      />
    </div>
  );
};

export default FilterDate;