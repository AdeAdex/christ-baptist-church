'use client';

import React from 'react';
import Image from 'next/image';
import { Pastor } from '@/app/types/pastors';

interface ChurchPastorSectionProps {
  pastor: Pastor | null;
}

const ChurchPastorSection: React.FC<ChurchPastorSectionProps> = ({ pastor }) => {
  return (
    <div className="flex flex-col md:flex-row items-center mb-16 gap-4 md:gap-0">
      <div className="w-full md:w-1/2 text-left md:pr-8 order-2 md:order-1">
      {pastor?.bio?.map((paragraph, index) => (
          <p key={index} className="text-lg text-gray-600 dark:text-gray-200 mb-4">
            {paragraph.children.map((child: { text: string }) => child.text).join('')}
          </p>
        ))}
      </div>
      <div className="w-full md:w-1/2 flex justify-center p-2 order-1 md:order-2">
        {pastor && (
          <Image
            src={pastor.image}
            alt={pastor.name}
            width={300}
            height={400}
            className="object-cover rounded-md w-full max-h-[500px]"
            priority
          />
        )}
      </div>
    </div>
  );
};

export default ChurchPastorSection;
