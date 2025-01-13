import React from "react";

const PastorsGallerySkeleton = () => {
  return (
    <div className="mb-16 animate-pulse">
      <div className="skeleton-text mb-4 h-6 bg-gray-300 dark:bg-gray-700"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg animate-pulse"
          >
            <div className="flex justify-center items-center mb-4 w-full h-72 bg-gray-300 dark:bg-gray-700 skeleton-loader"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 skeleton-loader mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 skeleton-loader mb-4"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastorsGallerySkeleton;
