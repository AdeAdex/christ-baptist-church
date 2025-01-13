// /app/components/home/WorshipSection.tsx

import React from "react";
import Heading from "../Heading";

const WorshipSection = () => {
  return (
    <section className="bg-milky py-5">
      <Heading text="Worship With Us" color="text-dark-heading" />
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 p-4">
        <div className="flex flex-col justify-center items-center p-6 rounded-md shadow-md w-full md:w-1/2 h-48">
          <h2 className="text-lg font-semibold text-gray-800">
            Sunday Services
          </h2>
          <ul className="mt-4 space-y-2 text-gray-700 text-center">
            <li>Sunday School: 9:00 am - 9:30 am</li>
            <li>DTM: 9:30 am - 10:15 am</li>
            <li>Service: 10:00 am</li>
          </ul>
        </div>
        <div className="flex flex-col justify-center items-center p-6 rounded-md shadow-md w-full md:w-1/2 h-48">
          <h2 className="text-lg font-semibold text-gray-800">
            Wednesday Mid-Week Service
          </h2>
          <ul className="mt-4 space-y-2 text-gray-700 text-center">
            <li>Bible Study: 6:00 pm</li>
            <li>Mid-Week Service: 6:00 pm</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WorshipSection;
