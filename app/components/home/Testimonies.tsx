import React from "react";
import Heading from "../Heading";

const Testimonies = () => {
  return (
    <section className="py-10 bg-light-gray">
      <Heading text="Member Testimonies" color="text-dark-heading" className="text-2xl md:text-4xl"/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="bg-white shadow-md p-4 rounded-md">
          <h3 className="font-semibold text-lg">Jane Doe</h3>
          <p className="mt-2 text-gray-700">"God healed me from a long-standing illness. I am forever grateful!"</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-md">
          <h3 className="font-semibold text-lg">John Smith</h3>
          <p className="mt-2 text-gray-700">"I found peace and purpose in my life through Christ. Thank you for your prayers!"</p>
        </div>
      </div>
    </section>
  );
};

export default Testimonies;
