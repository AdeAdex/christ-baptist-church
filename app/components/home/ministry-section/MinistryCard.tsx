import React from "react";
import MinistryHeader from "./MinistryHeader";
import MinistryContent from "./MinistryContent";

interface MinistryCardProps {
  title?: string;
  content?: string;
}

const MinistryCard: React.FC<MinistryCardProps> = ({
  title,
  content,
}) => {
  return (
    <div className="flex flex-row w-full items-start py-4 transition duration-300 ease-in-out text-white">
      {/* MinistryHeader with a fixed width to ensure alignment */}
      <div className="flex flex-col w-[100px] lg:w-[200px]"> {/* Fixed width for all headers */}
        <MinistryHeader title={title} className="font-[900] text-[14px] lg:text-[20px]" />
      </div>

      {/* Vertical line */}
      <div className="h-[40px] border-l-2 border-white mx-4"></div>

      {/* Ministry content */}
      <div className="flex-1">
        <MinistryContent content={content} className="font-bold text-[10px] lg:text-[12px]" />
      </div>
    </div>
  );
};

export default MinistryCard;
