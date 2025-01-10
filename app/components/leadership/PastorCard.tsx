'use client';

import React from 'react';
import Image from 'next/image';
import SocialIconRenderer from './SocialIconRenderer';
import { Pastor } from '@/app/types/pastors';

interface PastorCardProps {
  pastor: Pastor;
}

const PastorCard: React.FC<PastorCardProps> = ({ pastor }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg group relative">
      <div className="flex justify-center items-center mb-4 w-full h-72 overflow-hidden relative">
        <Image
          src={pastor.image}
          alt={pastor.name}
          width={300}
          height={200}
          className="w-full object-cover rounded-md transition-all duration-300 group-hover:brightness-100 group-hover:opacity-50"
          priority
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{pastor.name}</h3>
      <p className="text-lg text-purple-700 dark:text-purple-400 mb-4">{pastor.role}</p>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        {pastor.socials.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl border border-1 rounded-full p-2 mx-2"
          >
            <SocialIconRenderer platform={social.platform} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default PastorCard;
