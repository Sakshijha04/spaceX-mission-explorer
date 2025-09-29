
import React from "react";

const ToggleSwitch = ({ label, isActive, onToggle }) => {
  return (
    <div className="flex items-center space-x-2">
      <span>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={isActive}
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => {
          // Toggle on Enter or Space
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          isActive ? "bg-blue-500 justify-end" : "bg-gray-300 justify-start"
        }`}
      >
        <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
      </button>
    </div>
  );
};

export default ToggleSwitch;
