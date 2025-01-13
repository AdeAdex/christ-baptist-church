"use client";

import React from "react";
import DeaconCard from "./DeaconCard";
import { Deacon } from "@/app/types/deacons";
import Heading from "../Heading";

interface DeaconsGalleryProps {
  deacons: Deacon[];
}

const DeaconsGallery: React.FC<DeaconsGalleryProps> = ({ deacons }) => {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Heading text="Meet Our Deacons" color="text-heading dark:text-dark-heading" className="text-3xl  mb-8"/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {deacons.map((deacon, index) => (
          <DeaconCard key={index} deacon={deacon} />
        ))}
      </div>
    </div>
  );
};

export default DeaconsGallery;
