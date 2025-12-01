import React from "react";
import "./SkeletonLoader.css";

const SkeletonLoader = () => {
  return (
    <div className="skeleton-container relative w-full min-h-screen overflow-hidden">

      <div className="absolute top-0 left-0 w-full p-4 flex items-center justify-between z-20 bg-white">
  
        <div className="skeleton-line h-7 w-32 rounded-md"></div>

        <div className="flex-1 mx-4 relative max-w-md">
          <div className="skeleton-line h-10 w-full rounded-full"></div>
        </div>

        <div className="hidden lg:flex gap-4 items-center">
          <div className="skeleton-line h-6 w-20 rounded-md"></div>
          <div className="skeleton-line h-6 w-20 rounded-md"></div>
          <div className="skeleton-line h-6 w-20 rounded-md"></div>
          <div className="skeleton-circle w-9 h-9"></div>
        </div>

        <div className="lg:hidden skeleton-circle w-8 h-8"></div>
      </div>

      <div className="flex flex-col justify-center items-center h-screen gap-4 relative z-10 text-center px-4">
        <div className="skeleton-line h-16 w-72 sm:w-96 rounded-md"></div>
        <div className="skeleton-line h-5 w-40 rounded-md"></div>
        <div className="skeleton-line h-4 w-60 rounded-md"></div>
        <div className="skeleton-line h-10 w-32 rounded-full mt-4"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
