import React from 'react'

interface SectionContentProps {
  content?: string;
  className?: string;
}

const SectionContent:React.FC<SectionContentProps> = ({content, className}) => {
  return (
    <h2 className={`${className} text-[14px] sm:text-[15px] md:text-[16px] lg:text-[16px] max-w-[804px] leading-relaxed`}>{content}</h2>
  )
}

export default SectionContent