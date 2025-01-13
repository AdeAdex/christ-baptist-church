// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';

// const ErrorPage = () => {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white">
//       <div className="text-center px-4">
//         <h1 className="text-6xl font-bold text-red-500">Oops!</h1>
//         <h2 className="mt-4 text-3xl font-semibold">
//           Something Went Wrong
//         </h2>
//         <p className="mt-2 text-lg text-gray-400">
//           We’re sorry for the inconvenience. Please try again or return to the home page.
//         </p>
//         <div className="mt-6">
//           <Link href="/">
//             <a className="px-6 py-3 bg-blue-600 text-white font-medium text-lg rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
//               Go Back to Home
//             </a>
//           </Link>
//         </div>
//         <div className="mt-8">
//           <Image
//             src="/images/error_404.jpg" // Replace with your actual image path
//             alt="Error Illustration"
//             width={400}
//             height={300}
//             className="mx-auto"
//             priority
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ErrorPage;





'use client';

import React from 'react';
import Link from 'next/link';

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-64 h-64 mx-auto"
            fill="currentColor"
          >
            <path
              d="M256 0C114.62 0 0 114.62 0 256s114.62 256 256 256 256-114.62 256-256S397.38 0 256 0zm0 472c-119.31 0-216-96.69-216-216S136.69 40 256 40s216 96.69 216 216-96.69 216-216 216z"
              className="text-gray-600"
            />
            <path
              d="M256 88c-13.25 0-24 10.75-24 24v128c0 13.25 10.75 24 24 24s24-10.75 24-24V112c0-13.25-10.75-24-24-24zm0 256c-17.67 0-32 14.33-32 32s14.33 32 32 32 32-14.33 32-32-14.33-32-32-32z"
              className="text-red-500"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
