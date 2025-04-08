import React from "react";
import SectionHeader from "./SectionHeader";
import SectionContent from "./SectionContent";
import SectionButton from "./SectionButton";

const OurCommunity = () => {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 gap-8 px-4 sm:px-8 md:px-16 
  bg-[linear-gradient(to_right,_#fdf1f3_3%,_#f9d8dd_50%,_#fdf1f3_80%)] 
  dark:bg-[linear-gradient(to_right,_#1f1f1f_3%,_#3a2c2e_50%,_#1f1f1f_80%)]"
    >
      <SectionHeader title="Discover Our Community" className="font-[600]" />
      <SectionContent
        content="We believe that church is more than just a building—it's a family. Our mission is to create a welcoming environment where everyone can grow in faith and build lasting relationships. Whether you're new to the area or looking for a place to connect, we invite you to experience the warmth and love of our church family. Join us for worship, small groups, and community events that will inspire and support you on your journey."
        className="text-center font-[400]"
      />
      <SectionButton
        title="Join Us"
        className="hover:bg-primary-button-hover text-white py-2 px-8 text-[16px] font-[500] rounded-3xl transition"
      />
    </div>
  );
};

export default OurCommunity;
