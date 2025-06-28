import React from "react";

function ProjectFilter({ years, selectedYear, onYearChange }) {
  return (
    <div className="max-w-xs ml-auto mr-40 mb-20">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Filter by Year
      </label>
      <select 
        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={selectedYear} 
        onChange={(e) => onYearChange(e.target.value)}
      >
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
  );
}

export default ProjectFilter;