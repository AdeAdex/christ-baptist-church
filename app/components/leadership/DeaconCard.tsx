'use client';

import React from 'react';
import Image from 'next/image';
import SocialIconRenderer from './SocialIconRenderer';
import { Deacon } from '@/app/types/deacons';

interface DeaconCardProps {
  deacon: Deacon;
}

const DeaconCard: React.FC<DeaconCardProps> = ({ deacon }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 md:w-[60%] mx-auto">
        <div
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg group relative"
        >
          <div className="flex justify-center items-center mb-4 w-full h-60 overflow-hidden">
            <Image
              src={deacon.image}
              alt={deacon.name}
              width={300}
              height={200}
              className="w-full object-cover rounded-md"
              priority
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {deacon.name}
          </h3>
          <p className="text-lg text-purple-700 dark:text-purple-400 mb-4">
            {deacon.role}
          </p>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {deacon.socials.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl"
              >
                <SocialIconRenderer platform={social.platform} />
              </a>
            ))}
          </div>
        </div>
      
    </div>
  );
};

export default DeaconCard;
