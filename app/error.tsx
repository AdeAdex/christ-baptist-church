'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-red-500">Oops!</h1>
        <h2 className="mt-4 text-3xl font-semibold">
          Something Went Wrong
        </h2>
        <p className="mt-2 text-lg text-gray-400">
          We’re sorry for the inconvenience. Please try again or return to the home page.
        </p>
        <div className="mt-6">
          <Link href="/">
            <a className="px-6 py-3 bg-blue-600 text-white font-medium text-lg rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
              Go Back to Home
            </a>
          </Link>
        </div>
        <div className="mt-8">
          <Image
            src="/images/error_404.jpg" // Replace with your actual image path
            alt="Error Illustration"
            width={400}
            height={300}
            className="mx-auto"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
