// src/components/YearDropdown.jsx
import React from "react";

const YearDropdown = ({ selectedYear, onChange, years }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
      {/* Screen reader label */}
      <label htmlFor="year" className="sr-only">
        Filter by launch year
      </label>

      <select
        id="year"
        value={selectedYear}
        onChange={(e) => onChange(e.target.value)}
        className="w-full sm:w-40 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Filter by launch year"
      >
        <option value="All">All</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearDropdown;
