
import React from "react";
import ToggleSwitch from "./ToggleSwitch";

const SuccessToggle = ({ isActive, onToggle }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
      <ToggleSwitch
        label="Successful only"
        isActive={isActive}
        onToggle={onToggle}
      />
    </div>
  );
};

export default SuccessToggle;
