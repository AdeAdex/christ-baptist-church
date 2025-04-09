import React from 'react'


interface MinistryHeaderProps {
        title?: string;
        className?: string;
      }

const MinistryHeader: React.FC<MinistryHeaderProps> = ({title, className}) => {
  return (
    <div className={`capitalize ${className}`}>{title}</div>
  )
}

export default MinistryHeader