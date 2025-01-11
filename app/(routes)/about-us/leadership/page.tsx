"use client";

import React, { useEffect, useState } from "react";
import { Pastor } from "@/app/types/pastors";
import { fetchPastors } from "@/sanity/services/pastorService";
import { Deacon } from "@/app/types/deacons";
import { fetchDeacons } from "@/sanity/services/deaconService";
import ChurchPastorSection from "@/app/components/leadership/ChurchPastorSection";
import PastorsGallery from "@/app/components/leadership/PastorsGallery";
import DeaconsGallery from "@/app/components/leadership/DeaconsGallery";
import { get, set } from "idb-keyval";

const LeadershipPage = () => {
  const [pastors, setPastors] = useState<Pastor[]>([]);
  const [deacons, setDeacons] = useState<Deacon[]>([]);

  useEffect(() => {
    const fetchPastorsData = async () => {
      try {
        // Try to get cached data
        const cachedPastors = await get<Pastor[]>("pastors");
        if (cachedPastors && cachedPastors.length > 0) {
          setPastors(cachedPastors);
          console.log("Loaded pastors from IndexedDB:", cachedPastors);
        } else {
          // Fetch data if not in IndexedDB
          const fetchedPastors = await fetchPastors();
          setPastors(fetchedPastors);
          await set("pastors", fetchedPastors); // Save to IndexedDB
          console.log("Fetched pastors from API:", fetchedPastors);
        }
      } catch (error) {
        console.error("Error fetching pastors data:", error);
      }
    };

    const fetchDeaconsData = async () => {
      try {
        // Try to get cached data
        const cachedDeacons = await get<Deacon[]>("deacons");
        if (cachedDeacons && cachedDeacons.length > 0) {
          setDeacons(cachedDeacons);
          console.log("Loaded deacons from IndexedDB:", cachedDeacons);
        } else {
          // Fetch data if not in IndexedDB
          const fetchedDeacons = await fetchDeacons();
          setDeacons(fetchedDeacons);
          await set("deacons", fetchedDeacons); // Save to IndexedDB
          console.log("Fetched deacons from API:", fetchedDeacons);
        }
      } catch (error) {
        console.error("Error fetching deacons data:", error);
      }
    };

    fetchPastorsData();
    fetchDeaconsData();
  }, []);

  return (
    <div className="mt-[130px] py-10 px-6 text-center bg-gray-100 dark:bg-gray-900">
      <ChurchPastorSection pastor={pastors[pastors.length - 1] || null} />
      <PastorsGallery pastors={pastors} />
      <DeaconsGallery deacons={deacons} />
    </div>
  );
};

export default LeadershipPage;
