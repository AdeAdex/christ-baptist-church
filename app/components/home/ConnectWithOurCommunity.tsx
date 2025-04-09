import React from "react";
import SectionHeader from "./SectionHeader";
import SectionContent from "./SectionContent";
import SectionButton from "./SectionButton";
import MinistryFrame from "@/public/images/5.jpg";

const ConnectWithOurCommunity = () => {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 lg:py-32 px-4 sm:px-8 md:px-16 bg-cover bg-center mt-16"
      style={{ backgroundImage: `url(${MinistryFrame.src})` }}
    >
      <div className="rounded-lg bg-white/10 backdrop-blur-md p-6 lg:p-12 flex flex-col items-center justify-center gap-5">
        <SectionHeader
          title="Connect With Our Community"
          className="font-bold text-white"
        />
        <SectionContent
          content="Join a welcoming and vibrant community of believers. Whether you're looking to grow in faith, find support, or serve others, there's a place for you here."
          className="text-center font-[400] text-white"
        />
        <SectionButton
          title="Join now"
          className="bg-transparent text-white py-2 px-8 text-[16px] font-[500] rounded-3xl transition border border-2"
        />
      </div>
    </div>
  );
};

export default ConnectWithOurCommunity;
