import React from "react";

interface ProgressProps {
  value: number; // progress value from 0 to 100
  className?: string;
}

export function Progress({ value, className = "" }: ProgressProps) {
  return (
    <div className={`w-full bg-gray-200 rounded-md overflow-hidden ${className}`}>
      <div
        className="bg-blue-600 h-2 transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
