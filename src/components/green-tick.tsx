import React from "react";

export default function GreenTick() {
  return (
    <div className="flex items-center justify-center w-16 h-16">
      <div className="relative w-full h-full">
        <svg
          className="animate-circle"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="stroke-green-500"
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="283"
            strokeDashoffset="283"
          />
        </svg>
        <svg
          className="absolute top-0 left-0 animate-tick"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline
            className="stroke-green-500"
            points="25,55 45,70 75,35"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="100"
            strokeDashoffset="100"
          />
        </svg>
      </div>
    </div>
  );
}
