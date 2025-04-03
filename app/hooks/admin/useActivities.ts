// /app/hooks/admin/useActivities.ts

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useAppDispatch } from "@/app/redux/hooks";
import { fetchActivities } from "@/app/actions/admin/activityActions";

export const useActivities = () => {
  const dispatch = useAppDispatch();

  // Listening to the activities state in Redux
  const { activities, error } = useSelector(
    (state: RootState) => state.activities
  );

  useEffect(() => {
    if (activities.length === 0) {
      dispatch(fetchActivities()); // Fetch activities when they are empty
    }
  }, [dispatch]); // Make sure this effect only runs when `dispatch` changes, to avoid multiple fetch calls

  // Return the activities and error to the component
  return { activities, error, dispatch };
};
