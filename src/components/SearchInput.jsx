// src/components/SearchInput.jsx
import React from "react";

const SearchInput = ({ value, onChange }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
      {/* Screen reader label */}
      <label htmlFor="search" className="sr-only">
        Search by mission name
      </label>

      <input
        type="text"
        id="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by mission name"
        className="w-full sm:w-64 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Search by mission name" // added for screen readers
      />
    </div>
  );
};

export default SearchInput;
