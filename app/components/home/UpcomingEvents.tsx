import React from "react";
import Heading from "../Heading";

const UpcomingEvents = () => {
  return (
    <section className="py-10 bg-white">
      <Heading text="Upcoming Events" color="text-dark-heading" className="text-2xl md:text-4xl"/>
      <div className="mt-6 space-y-6">
        <div className="bg-gray-100 shadow-md p-4 rounded-md">
          <h3 className="font-semibold text-lg">Church Anniversary Celebration</h3>
          <p className="mt-2 text-gray-700">Join us as we celebrate our Church Anniversary on Sunday, May 15th, at 10:00 am. It will be a day of praise, worship, and thanksgiving!</p>
          <p className="mt-2 text-gray-600">Location: Christ Baptist Church Auditorium</p>
        </div>
        <div className="bg-gray-100 shadow-md p-4 rounded-md">
          <h3 className="font-semibold text-lg">Annual Charity Drive</h3>
          <p className="mt-2 text-gray-700">We are collecting donations for those in need in our community. Please bring non-perishable food items and toiletries on Sunday, April 25th.</p>
          <p className="mt-2 text-gray-600">Drop-off Location: Church Lobby</p>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
