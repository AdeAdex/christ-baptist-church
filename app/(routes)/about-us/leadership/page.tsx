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
import ChurchPastorSkeleton from "@/app/components/leadership/ChurchPastorSkeleton";
import PastorsGallerySkeleton from "@/app/components/leadership/PastorsGallerySkeleton";
import DeaconsGallerySkeleton from "@/app/components/leadership/DeaconsGallerySkeleton";

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
        <ChurchPastorSkeleton />
      ) : (
        <ChurchPastorSection pastor={pastors[pastors.length - 1] || null} />
      )}

      {/* Pastors Gallery */}
      {loading ? (
        <PastorsGallerySkeleton />
      ) : (
        <PastorsGallery pastors={pastors} />
      )}

      {/* Deacons Gallery */}
      {loading ? (
        <DeaconsGallerySkeleton />
      ) : (
        <DeaconsGallery deacons={deacons} />
      )}
    </div>
  );
};

export default LeadershipPage;
