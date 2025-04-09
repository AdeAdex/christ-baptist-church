import React from "react";

interface SectionContentProps {
  content?: string;
  className?: string;
  splitContent?: boolean; // New prop to control splitting
}

const SectionContent: React.FC<SectionContentProps> = ({ content, className, splitContent }) => {
  if (!content) return null;

  return (
    <div className={`${className} text-[14px] sm:text-[15px] md:text-[16px] lg:text-[16px] max-w-[804px] leading-relaxed`}>
      {splitContent ? (
        // Split content into paragraphs
        content.split("\n").map((paragraph, idx) => (
          <p key={idx} className="text-justify mt-5">
            {paragraph.trim()}
          </p>
        ))
      ) : (
        // Display content as plain text
        <p className="">{content}</p>
      )}
    </div>
  );
};

export default SectionContent;
