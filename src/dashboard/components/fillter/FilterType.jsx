import React from "react";

const FilterType = ({ setType }) => {
  return (
    <div className="w-full">
      <span className="text-gray-800 font-semibold text-sm">Type</span>

      <select
        onChange={(e) => setType(e.target.value)}
        className="lg:px-3 w-full py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10"
      >
        <option value="">All Types</option>
        <option value="breaking">Breaking</option>
        <option value="trending">Trending</option>
        <option value="featured">Featured</option>
        <option value="popular">Popular</option>
      </select>
    </div>
  );
};

export default FilterType;