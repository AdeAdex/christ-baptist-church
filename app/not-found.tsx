import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="text-center text-white p-8 md:p-16">
        {/* 404 Title with Tailwind fade-in animation */}
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-4 ">
          4<span className="text-yellow-300">0</span>4
        </h1>
        {/* Subtitle with fade-in */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 ">
          Oops! Page Not Found.
        </h2>
        {/* Description with fade-in */}
        <p className="text-lg mb-8 ">
          The page you are looking for might have been moved, deleted, or never
          existed.
        </p>
        {/* Button with hover effect */}
        <div className="flex justify-center ">
          <Link
            href="/"
            className="px-6 py-3 text-xl font-semibold bg-yellow-300 text-gray-800 rounded-lg shadow-md hover:bg-yellow-400 transition-all duration-300 ease-in-out"
          >
            Go Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
