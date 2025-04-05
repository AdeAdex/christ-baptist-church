// /app/actions/activitiesActions.ts

import { setActivities, setLoading, setError } from "@/app/redux/slices/activitiesSlice";
import { AppDispatch } from "../redux/store";

export const fetchActivities = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading()); // Set loading state before starting the fetch
  try {
    const response = await fetch("/api/admin/get-public-activities");
    const data = await response.json();
    
    if (response.ok) {
      dispatch(setActivities(data.activities)); // Update the state with activities
    } else {
      dispatch(setError(data.message || "Failed to fetch activities")); // Handle errors
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(setError(error.message)); // Handle network or other errors
    } else {
      dispatch(setError("Unknown error occurred"));
    }
  }
};
