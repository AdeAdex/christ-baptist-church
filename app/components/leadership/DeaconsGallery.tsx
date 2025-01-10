'use client';

import React from 'react';
import DeaconCard from './DeaconCard';
import { Deacon } from '@/app/types/deacons';

interface DeaconsGalleryProps {
  deacons: Deacon[];
}

const DeaconsGallery: React.FC<DeaconsGalleryProps> = ({ deacons }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {deacons.map((deacon, index) => (
        <DeaconCard key={index} deacon={deacon} />
      ))}
    </div>
  );
};

export default DeaconsGallery;
