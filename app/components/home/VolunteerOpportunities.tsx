import React from "react";
import Heading from "../Heading";

const VolunteerOpportunities = () => {
  return (
    <section className="py-10 bg-light-gray">
      <Heading text="Volunteer Opportunities" color="text-dark-heading" className="text-2xl md:text-4xl"/>
      <div className="mt-6 space-y-6">
        <div className="bg-white shadow-md p-4 rounded-md">
          <h3 className="font-semibold text-lg">Children's Ministry</h3>
          <p className="mt-2 text-gray-700">We are looking for volunteers to help in our Children Ministry on Sundays. If you love working with kids and sharing the gospel, we would love to have you on our team!</p>
          <p className="mt-2 text-gray-600">Volunteer Schedule: Sundays from 9:00 am to 12:00 pm</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-md">
          <h3 className="font-semibold text-lg">Hospitality Team</h3>
          <p className="mt-2 text-gray-700">Join our Hospitality Team to help greet newcomers, serve refreshments, and ensure that everyone feels welcome at Christ Baptist Church.</p>
          <p className="mt-2 text-gray-600">Volunteer Schedule: Sundays before and after services</p>
        </div>
      </div>
    </section>
  );
};

export default VolunteerOpportunities;
