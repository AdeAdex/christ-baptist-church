'use client';

import React from 'react';
import PastorCard from './PastorCard';
import { Pastor } from '@/app/types/pastors';

interface PastorsGalleryProps {
  pastors: Pastor[];
}

const PastorsGallery: React.FC<PastorsGalleryProps> = ({ pastors }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {pastors.map((pastor, index) => (
        <PastorCard key={index} pastor={pastor} />
      ))}
    </div>
  );
};

export default PastorsGallery;
