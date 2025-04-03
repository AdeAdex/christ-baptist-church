// // /app/hooks/admin/useActivities.ts

// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "@/app/redux/store";
// import { useAppDispatch } from "@/app/redux/hooks";
// import { fetchActivities } from "@/app/actions/admin/activityActions";
// import { Activity } from "@/app/redux/slices/activitiesSlice";

// // export const useActivities = () => {
// //   const dispatch = useAppDispatch();

// //   // Listening to the activities state in Redux
// //   const { activities, error } = useSelector(
// //     (state: RootState) => state.activities
// //   );

// //   useEffect(() => {
// //     if (activities.length === 0) {
// //       dispatch(fetchActivities()); // Fetch activities when they are empty
// //     }
// //   }, [dispatch]); // Make sure this effect only runs when `dispatch` changes, to avoid multiple fetch calls

// //   // Return the activities and error to the component
// //   return { activities, error, dispatch };
// // };





import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useAppDispatch } from "@/app/redux/hooks";
import { fetchActivities } from "@/app/actions/admin/activityActions";
import { Activity } from "@/app/redux/slices/activitiesSlice";

export const useActivities = () => {
  const dispatch = useAppDispatch();
  const activities = useSelector((state: RootState) => state.activities.activities);
  const member = useSelector((state: RootState) => state.auth.member);
  const [loading, setLoading] = useState(true);

  // console.log("Filtered Activities:", activities);

  useEffect(() => {
    const fetchActivitiesData = async () => {
      setLoading(true); // Set loading to true when fetching
      await dispatch(fetchActivities());
      setLoading(false); // Set loading to false once fetching is complete
    };

    fetchActivitiesData();
  }, [dispatch]);

  // Filter activities based on member's ministry if they don't have admin permissions
  const filteredActivities = activities.filter((activity: Activity) => {
    if (member?.role === "admin" && member?.hasPermission && 
        (member?.permissionLevel === "full" || member?.permissionLevel === "limited")) {
      return true; // Admins get all activities
    } else {
      return activity.ministry === member?.ministry;
    }
  });

  return { activities: filteredActivities, loading, dispatch };
};
