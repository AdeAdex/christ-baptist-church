import React from "react";
import Image from "next/image";
import pastors from "@/app/data/pastors";
import deacons from "@/app/data/deacons";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

const LeadershipPage = () => {
  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <FaFacebookF className="text-blue-600" />;
      case "twitter":
        return <FaTwitter className="text-blue-400" />;
      case "instagram":
        return <FaInstagram className="text-pink-500" />;
      case "whatsapp":
        return <FaWhatsapp className="text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-[130px] py-10 px-6 text-center bg-gray-100 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-4">
        Meet Our Church Pastor
      </h2>
      {/* Church Pastor Section */}
      <div className="flex flex-col md:flex-row items-center mb-16 gap-4 md:gap-0">
        {/* Text Section */}
        <div className="w-full md:w-1/2 text-left md:pr-8 order-2 md:order-1">
          <p className="text-lg text-gray-600 dark:text-gray-200">
            Rev. J.I Oyelekan is a dedicated and passionate leader who has
            served as the spiritual guide for our congregation for many years.
            With an unwavering commitment to fostering spiritual growth and
            strengthening the community, he works tirelessly to inspire and
            uplift others through his teachings, faith, and love. His leadership
            style focuses on empathy, compassion, and a deep understanding of
            the challenges faced by individuals in today&rsquo;s world.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-200 mt-4">
            Rev. Oyelekan&rsquo;s journey has been one of service, humility, and
            a desire to empower others. He emphasizes the importance of both
            personal faith and collective strength within the church family,
            encouraging all members to build relationships grounded in trust and
            mutual support. His vision for the church is to create a welcoming
            space where everyone can experience God&rsquo;s love, grow
            spiritually, and contribute to the well-being of the broader
            community.
          </p>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center p-2 order-1 md:order-2">
          <Image
            src={pastors[0].image}
            alt={pastors[0].name}
            width={300}
            height={400}
            className="object-cover rounded-md w-full max-h-[500px]"
            priority
          />
        </div>
      </div>

      {/* Pastors Section */}
      <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-8">
        Our Pastors
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {pastors.map((pastor, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg group relative"
          >
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
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              {pastor.name}
            </h3>
            <p className="text-lg text-purple-700 dark:text-purple-400 mb-4">
              {pastor.role}
            </p>

            {/* Social Media Icons */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              {pastor.socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl border border-1 rounded-full p-2 mx-2"
                >
                  {renderSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Deacons Section */}
      <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-8 mt-12">
        Our Deacons
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {deacons.map((deacon, index) => (
          <div
            key={index}
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

            {/* Social Media Icons */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {deacon.socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl"
                >
                  {renderSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadershipPage;
