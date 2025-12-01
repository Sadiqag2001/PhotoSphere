// photosphere/src/components/SkeletonLoader.jsx

import React from 'react';
import './SkeletonLoader.css'; // We'll create this CSS file next

const SkeletonLoader = () => {
  return (
    <div className="skeleton-container flex flex-col min-h-screen">
      {/* Skeleton for NavBar */}
      <div className="skeleton-navbar bg-gray-800 p-4 flex items-center justify-between">
        <div className="skeleton-line w-32 h-6 rounded-md"></div>
        <div className="skeleton-line w-48 h-6 rounded-md hidden md:block"></div>
        <div className="flex gap-4">
          <div className="skeleton-line w-16 h-6 rounded-md hidden lg:block"></div>
          <div className="skeleton-line w-16 h-6 rounded-md hidden lg:block"></div>
          <div className="skeleton-circle w-8 h-8 rounded-full"></div>
        </div>
      </div>

      {/* Skeleton for Main Content Area */}
      <main className="skeleton-main flex-grow p-4 bg-gray-900">
        <div className="skeleton-line w-full h-80 rounded-lg mb-4"></div> {/* Hero/ExplorePreview placeholder */}
        <div className="flex flex-col w-30 gap-4">
          <div className="skeleton-card bg-gray-800 p-4 rounded-lg h-48 hidden lg:block"></div>
            <div className="skeleton-line w-3/4 h-5 mb-2 rounded-md"></div>
            <div className="skeleton-line w-1/2 h-4 rounded-md"></div>
        </div>
      </main>

      {/* Skeleton for Footer */}
      <footer className="skeleton-footer bg-gray-800 p-4 flex justify-center items-center">
        <div className="skeleton-line w-48 h-5 rounded-md"></div>
      </footer>
    </div>
  );
};

export default SkeletonLoader;
