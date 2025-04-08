import Image from "next/image";
import React from "react";
import Lightbox from "@/public/images/Lightbox.png";

const VideoSection = () => {
  return (
    <div className="py-10 lg:py-16 px-10">
      <Image
        src={Lightbox}
        alt="Lightbox"
        width={1920}
        height={1080}
        className="w-full object-fill lg:object-cover h-[200px] md:h-auto"
      />
    </div>
  );
};

export default VideoSection;
