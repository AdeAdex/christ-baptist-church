// /app/components/home/Activities.tsx

'use client';

import React, { useEffect } from "react";
import Heading from "../Heading";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities } from "@/app/actions/activitiesActions"; // Import the fetchActivities action
import { AppDispatch, RootState } from "@/app/redux/store"; // Assuming you have RootState for your store
import Loader from "../Loader";

const Activities = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { activities, isLoading, error } = useSelector(
    (state: RootState) => state.activities
  );

  useEffect(() => {
    dispatch(fetchActivities()); 
  }, [dispatch]);

  if (isLoading) return <div><Loader/></div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="py-10">
      <Heading text="Upcoming Activities" color="text-dark-heading" className="text-2xl md:text-4xl" />
      <div className="mt-6 space-y-6">
        {activities.length === 0 ? (
          <p>No public activities available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <div key={activity._id} className="bg-white shadow-md p-4 rounded-md">
                <h3 className="font-semibold text-lg">{activity.title}</h3>
                <p className="mt-2 text-gray-700">{activity.subtitle}</p>
                <p className="mt-2 text-gray-600">Ministry: {activity.ministryName}</p>
                <p className="mt-2 text-gray-600">Date: {new Date(activity.createdAt!).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Activities;
