import React from 'react'

interface SectionButtonProps {
        title?: string;
        className?: string;
        }

const SectionButton = ({title, className = ""}: SectionButtonProps) => {
  return (
    <button className={`bg-primary-button ${className}`}>{title}</button>
  )
}

export default SectionButton