import React from "react";
import Link from "next/link";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="text-center">
        
        <div className="mt-8">
          <Image
            src="/images/404-error.png"
            alt="Not Found Illustration"
            width={400}
            height={300}
            className="mx-auto"
            priority
          />
        </div>

        <p className="mt-2 text-lg text-gray-400">
          The page you are looking for doesn&rsquo;t exist or has been moved.
        </p>
        <div className="mt-6">
          <Link href="/" className="px-6 py-3 bg-cyan-600 text-white font-medium text-lg rounded-lg shadow-lg hover:bg-cyan-500 transition duration-300">
              Go Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
