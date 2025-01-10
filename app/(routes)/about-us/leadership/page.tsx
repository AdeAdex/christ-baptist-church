'use client';

import React, { useEffect, useState } from "react";
import { Pastor } from "@/app/types/pastors";
import { fetchPastors } from "@/sanity/services/pastorService";
import { Deacon } from "@/app/types/deacons"; // Import Deacon type
import { fetchDeacons } from "@/sanity/services/deaconService"; // Import deacon service
import ChurchPastorSection from "@/app/components/leadership/ChurchPastorSection";
import PastorsGallery from "@/app/components/leadership/PastorsGallery";
import DeaconsGallery from "@/app/components/leadership/DeaconsGallery";

const LeadershipPage = () => {
  const [pastors, setPastors] = useState<Pastor[]>([]);
  const [deacons, setDeacons] = useState<Deacon[]>([]); // State for deacons

  useEffect(() => {
    // Fetch pastors data
    const fetchPastorsData = async () => {
      const fetchedPastors = await fetchPastors();
      setPastors(fetchedPastors);
      console.log("fetchedPastors", fetchedPastors);
    };

    // Fetch deacons data
    const fetchDeaconsData = async () => {
      const fetchedDeacons = await fetchDeacons();
      setDeacons(fetchedDeacons);
      console.log("fetchedDeacons", fetchedDeacons);
    };

    fetchPastorsData();
    fetchDeaconsData();
  }, []);

  return (
    <div className="mt-[130px] py-10 px-6 text-center bg-gray-100 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-4">Meet Our Church Pastor</h2>
      <ChurchPastorSection pastor={pastors[0] || null} />
      <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-8">Our Pastors</h2>
      <PastorsGallery pastors={pastors} />
      <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-8 mt-12">Our Deacons</h2>
      <DeaconsGallery deacons={deacons} /> {/* Display deacons */}
    </div>
  );
};

export default LeadershipPage;
