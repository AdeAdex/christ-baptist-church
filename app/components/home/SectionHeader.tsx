import React from "react";

interface SectionHeaderProps {
  title?: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, className }) => {
  return (
      <h2 className={`text-[24px] sm:text-[28px] md:text-[32px] lg:text-[40px] text-center uppercase ${className}`}>{title}</h2>
  );
};

export default SectionHeader;
