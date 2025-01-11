"use client";

import React from "react";
import PastorCard from "./PastorCard";
import { Pastor } from "@/app/types/pastors";

interface PastorsGalleryProps {
  pastors: Pastor[];
}

const PastorsGallery: React.FC<PastorsGalleryProps> = ({ pastors }) => {
  const sortedPastors = [...pastors].sort((a, b) =>
    b.name.localeCompare(a.name)
  );

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-8">
        Meet Our Our Pastors
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {sortedPastors.map((pastor, index) => (
          <PastorCard key={index} pastor={pastor} />
        ))}
      </div>
    </div>
  );
};

export default PastorsGallery;
