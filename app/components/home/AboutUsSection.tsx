import React from "react";
import SectionHeader from "./SectionHeader";
import SectionContent from "./SectionContent";
import AboutImage from "@/public/images/about-us-image.png";
import Image from "next/image";

const AboutUsSection = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 px-4 lg:px-10 py-10 lg:py-16">
      <div className="w-full lg:w-1/2">
        <SectionHeader title="About Us" className="font-[800] text-[40px]" />
        <SectionContent
  content={`At Christ Baptist Church, we are a vibrant and welcoming community dedicated to growing in faith and spreading the love of Christ. Founded on the teachings of the Bible, our mission is simple: to make disciples, serve others, and live out God’s love in everything we do.

We believe that church is not just a place, but a family—one that supports and encourages each other through every season of life. Whether you're seeking a deeper connection with God, a place to find peace, or a community to serve, we are here to walk alongside you. Our services are designed to be meaningful and relevant, offering a space to worship, learn, and grow together. From inspiring worship experiences to small groups and outreach initiatives, there’s a place for everyone to get involved and make a difference.

We invite you to join us in this journey of faith. Come as you are, and experience a community that cares about you, your spiritual growth, and your life’s purpose.`}
  className="font-[400] mt-4"
  splitContent={true}
/>

      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        {/* Image Section */}
        <Image
          src={AboutImage}
          alt="About Us"
          className="w-full max-w-[476px] h-auto object-contain rounded-lg shadow-lg"
          priority
        />
      </div>
    </div>
  );
};

export default AboutUsSection;
