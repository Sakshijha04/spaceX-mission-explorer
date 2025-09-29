
import React, { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import YearDropdown from "./YearDropdown";
import SuccessToggle from "./SuccessToggle";
import { useAppContext } from "../context/AppContext";

const Filters = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedYear,
    setSelectedYear,
    showSuccessful,
    setShowSuccessful,
    launches,
  } = useAppContext();

  // Local state for debounced search input
  const [inputValue, setInputValue] = useState(searchQuery);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      console.log("Debounced search fired:", inputValue);
      setSearchQuery(inputValue); // Update context after 300ms
    }, 300);

    return () => clearTimeout(handler); // Cleanup
  }, [inputValue, setSearchQuery]);

  // Extract unique years from launches
  const years = [
    ...Array.from(
      new Set(
        launches.map((launch) => new Date(launch.date_utc).getFullYear())
      )
    ).sort((a, b) => b - a),
  ];

  return (
    <section className="bg-white p-4 rounded-md shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
      {/* Pass local input value and update local state */}
      <SearchInput value={inputValue} onChange={setInputValue} />
      
      <YearDropdown
        selectedYear={selectedYear}
        onChange={setSelectedYear}
        years={years}
      />
      <SuccessToggle
        isActive={showSuccessful}
        onToggle={() => setShowSuccessful(!showSuccessful)}
      />
    </section>
  );
};

export default Filters;
