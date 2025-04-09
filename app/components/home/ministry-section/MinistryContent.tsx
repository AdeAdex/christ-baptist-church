import React from "react";

interface MinistryContentProps {
  content?: string;
  className?: string;
}

const MinistryContent: React.FC<MinistryContentProps> = ({
  content,
  className,
}) => {
  return <div className={`font-bold text-[12px] ${className}`}>{content}</div>;
};

export default MinistryContent;
