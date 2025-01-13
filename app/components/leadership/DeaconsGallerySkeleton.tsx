import React from "react";

const DeaconsGallerySkeleton = () => {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="skeleton-text mb-4 h-6 bg-gray-300 dark:bg-gray-700"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="group hover:scale-105 transform transition-transform duration-300 animate-pulse"
          >
            <div className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-1 rounded-full shadow-xl">
              <div className="rounded-full flex flex-col items-center text-center">
                <div className="relative w-full h-64 bg-gray-300 dark:bg-gray-700 skeleton-loader rounded-full"></div>
              </div>
            </div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 skeleton-loader my-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 skeleton-loader mb-4"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeaconsGallerySkeleton;
