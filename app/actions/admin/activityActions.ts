// /app/actions/admin/activityActions.ts

import {
  setActivities,
  setLoading,
  setError,
  deleteActivityFromState,
} from "@/app/redux/slices/activitiesSlice";
import { AppDispatch } from "@/app/redux/store";

interface MinistryActivityFormData {
  title: string;
  subtitle: string;
  image: string;
  ministry: string;
  visibility: "private" | "public"; // Assuming visibility is either private or public
  ministryAccess?: string[]; // Optional, only used for private activities
}

export const addMinistryActivity = async (
  formData: MinistryActivityFormData,
  adminId: string
) => {
  try {
    const res = await fetch("/api/admin/add-ministries-activities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, adminId }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to add activity");
    }

    const newActivity = await res.json(); 
//     console.log("newActivities", newActivity)
    return { success: true, newActivity }; 
  } catch (error: unknown) {
    console.error(error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred.",
    };
  }
};

export const fetchActivities = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading());
  try {
    const res = await fetch("/api/admin/get-ministry-activities");

    if (!res.ok) {
      throw new Error("Failed to fetch activities");
    }

    const data = await res.json();
//     console.log("data", data.activities);
    dispatch(setActivities(data.activities)); // Dispatch activities to Redux
  } catch (error: unknown) {
    dispatch(
      setError(error instanceof Error ? error.message : "An unknown error occurred.",)
    );
  }
};







export const deleteActivity = async (activityId: string, dispatch: AppDispatch) => {
  dispatch(setLoading());
  try {
    const res = await fetch("/api/admin/delete-ministry-activity", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activityId }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to delete activity");
    }

    dispatch(deleteActivityFromState(activityId));

    return { success: true };
  } catch (error: unknown) {
    dispatch(setError(error instanceof Error ? error.message : "An unknown error occurred."));
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred.",
    };
  }
};

