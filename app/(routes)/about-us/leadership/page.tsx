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

  useEffect(() => {
    // Fetch pastors data using cache helper
    const fetchPastorsData = async () => {
      const fetchedPastors = await getCachedData("pastors", fetchPastors);
      setPastors(fetchedPastors);
    };

    // Fetch deacons data using cache helper
    const fetchDeaconsData = async () => {
      const fetchedDeacons = await getCachedData("deacons", fetchDeacons);
      setDeacons(fetchedDeacons);
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
