import React from "react";

const ChurchPastorSkeleton = () => {
  return (
    <div className="mb-16 animate-pulse">
      <div className="skeleton-text mb-4 h-6 bg-gray-300 dark:bg-gray-700"></div>
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0">
        <div className="w-full md:w-1/2 text-left md:pr-8 order-2 md:order-1">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-6 bg-gray-300 dark:bg-gray-700 skeleton-loader mb-4"
            ></div>
          ))}
        </div>

        <div className="w-full md:w-1/2 flex justify-center p-2 order-1 md:order-2">
          <div className="w-full min-h-[500px] bg-gray-300 dark:bg-gray-700 rounded-md skeleton-loader"></div>
        </div>
      </div>
    </div>
  );
};

export default ChurchPastorSkeleton;
