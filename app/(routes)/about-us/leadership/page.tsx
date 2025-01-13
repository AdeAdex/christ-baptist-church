"use client";

import React, { useEffect, useState } from "react";
import { Pastor } from "@/app/types/pastors";
import { fetchPastors } from "@/sanity/services/pastorService";
import { Deacon } from "@/app/types/deacons";
import { fetchDeacons } from "@/sanity/services/deaconService";
import ChurchPastorSection from "@/app/components/leadership/ChurchPastorSection";
import PastorsGallery from "@/app/components/leadership/PastorsGallery";
import DeaconsGallery from "@/app/components/leadership/DeaconsGallery";
import { getCachedData } from "@/app/cache/useCache";

const LeadershipPage = () => {
  const [pastors, setPastors] = useState<Pastor[]>([]);
  const [deacons, setDeacons] = useState<Deacon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch pastors data using cache helper
      const fetchedPastors = await getCachedData("pastors", fetchPastors);
      setPastors(fetchedPastors);

      // Fetch deacons data using cache helper
      const fetchedDeacons = await getCachedData("deacons", fetchDeacons);
      setDeacons(fetchedDeacons);

      // Set loading to false after data is fetched
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="text-center">
      {/* Church Pastor Section */}
      {loading ? (
        <div className="mb-16 animate-pulse">
          <div className="skeleton-text mb-4 h-6 bg-gray-300 dark:bg-gray-700"></div>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0">
            <div className="w-full md:w-1/2 text-left md:pr-8 order-2 md:order-1">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-6 bg-gray-300 dark:bg-gray-700 skeleton-loader mb-4"
                ></div>
              ))}
            </div>

            <div className="w-full md:w-1/2 flex justify-center p-2 order-1 md:order-2">
              <div className="w-full min-h-[500px] bg-gray-300 dark:bg-gray-700 rounded-md skeleton-loader"></div>
            </div>
          </div>
        </div>
      ) : (
        <ChurchPastorSection pastor={pastors[pastors.length - 1] || null} />
      )}

      {/* Pastors Gallery */}
      {loading ? (
        <div className="mb-16 animate-pulse">
          <div className="skeleton-text mb-4 h-6 bg-gray-300 dark:bg-gray-700"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg animate-pulse"
              >
                <div className="flex justify-center items-center mb-4 w-full h-72 bg-gray-300 dark:bg-gray-700 skeleton-loader"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-700 skeleton-loader mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 skeleton-loader mb-4"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <PastorsGallery pastors={pastors} />
      )}

      {/* Deacons Gallery */}
      {loading ? (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-pulse">
          <div className="skeleton-text mb-4 h-6 bg-gray-300 dark:bg-gray-700"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="group hover:scale-105 transform transition-transform duration-300 animate-pulse"
              >
                <div className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-1 rounded-full shadow-xl">
                  <div className="rounded-full flex flex-col items-center text-center">
                    <div className="relative w-full h-64 bg-gray-300 dark:bg-gray-700 skeleton-loader rounded-full"></div>
                  </div>
                </div>
                <div className="h-6 bg-gray-300 dark:bg-gray-700 skeleton-loader my-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 skeleton-loader mb-4"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <DeaconsGallery deacons={deacons} />
      )}
    </div>
  );
};

export default LeadershipPage;
