import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-24 h-24">
        <div className="absolute top-0 left-0 right-0 bottom-0">
          <div className="w-full h-full rounded-full border-4 border-t-primary border-r-primary border-b-primary border-l-transparent animate-spin"></div>
        </div>
        <div className="absolute top-2 left-2 right-2 bottom-2">
          <div className="w-full h-full rounded-full border-4 border-t-primary/80 border-r-primary/80 border-b-primary/80 border-l-transparent animate-spin animation-delay-150"></div>
        </div>
        <div className="absolute top-4 left-4 right-4 bottom-4">
          <div className="w-full h-full rounded-full border-4 border-t-primary/60 border-r-primary/60 border-b-primary/60 border-l-transparent animate-spin animation-delay-300"></div>
        </div>
        <div className="absolute top-6 left-6 right-6 bottom-6 flex items-center justify-center">
          <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
