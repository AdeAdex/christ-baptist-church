"use client";

import React from "react";
import Image from "next/image";
import SocialIconRenderer from "./SocialIconRenderer";
import { Deacon } from "@/app/types/deacons";

interface DeaconCardProps {
  deacon: Deacon;
}

const DeaconCard: React.FC<DeaconCardProps> = ({ deacon }) => {
  return (
    <div className="group hover:scale-105 transform transition-transform duration-300">
      <div className=" relative bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-1 rounded-full shadow-xl ">
        <div className="rounded-full flex flex-col items-center text-center">
          {/* Image Section */}
          <div className="relative w-full h-64 rounded-full overflow-hidden shadow-lg">
            <Image
              src={deacon.image}
              alt={deacon.name}
              layout="fill"
              objectFit="cover"
              priority
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>
      </div>
      {/* Name and Role */}
      <h3 className="text-lg font-bold text-gray-800 dark:text-white my-2">
        {deacon.name}
      </h3>
      <p className="text-sm text-purple-700 dark:text-purple-400 mb-4">
        {deacon.role}
      </p>

      {/* Social Icons */}
      <div className="flex justify-center space-x-4  group-hover:opacity-100 transition-opacity duration-300">
        {deacon.socials.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-400 transition-colors duration-300"
          >
            <SocialIconRenderer platform={social.platform} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default DeaconCard;
