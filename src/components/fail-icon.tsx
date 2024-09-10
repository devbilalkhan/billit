import React from "react";

export default function FailIcon() {
  return (
    <div className="flex items-center justify-center w-16 h-16">
      <div className="relative w-full h-full">
        <svg
          className="animate-circle"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="stroke-red-500"
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
          className="absolute top-0 left-0 animate-cross"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            className="stroke-red-500"
            x1="30"
            y1="30"
            x2="70"
            y2="70"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="57"
            strokeDashoffset="57"
          />
          <line
            className="stroke-red-500"
            x1="70"
            y1="30"
            x2="30"
            y2="70"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="57"
            strokeDashoffset="57"
          />
        </svg>
      </div>
    </div>
  );
}
