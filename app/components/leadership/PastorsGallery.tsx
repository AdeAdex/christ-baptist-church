"use client";

import React from "react";
import PastorCard from "./PastorCard";
import { Pastor } from "@/app/types/pastors";
import Heading from "../Heading";

interface PastorsGalleryProps {
  pastors: Pastor[];
}

const PastorsGallery: React.FC<PastorsGalleryProps> = ({ pastors }) => {
  const sortedPastors = [...pastors].sort((a, b) =>
    b.name.localeCompare(a.name)
  );

  return (
    <div>
      <Heading text="Meet Our Pastors" color="text-heading dark:text-dark-heading" className="text-3xl mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {sortedPastors.map((pastor, index) => (
          <PastorCard key={index} pastor={pastor} />
        ))}
      </div>
    </div>
  );
};

export default PastorsGallery;
