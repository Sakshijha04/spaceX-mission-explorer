// src/components/Badge.jsx
import React from "react";

const Badge = ({ children, className = "" }) => {
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs border ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
