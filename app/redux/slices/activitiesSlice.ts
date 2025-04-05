//  /app/redux/slices/activitiesSlice.ts


import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Activity {
  _id?: string;
  title?: string;
  subtitle?: string;
  image?: string;
  ministry?: string;
  ministryId?: string;
  ministryName?: string;
  visibility?: "private" | "public";
}

interface ActivitiesState {
  activities: Activity[];
  isLoading: boolean;
  error: string | null; // Error state to store error messages
}

const initialState: ActivitiesState = {
  activities: [],
  isLoading: false,
  error: null, // Initialize error state as null
};

const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    setActivities: (state, action: PayloadAction<Activity[]>) => {
      state.activities = action.payload;
      state.isLoading = false;
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    addActivity: (state, action: PayloadAction<Activity>) => {
      state.activities.push(action.payload); // Add the new activity to the activities array
    },

    deleteActivityFromState: (state, action: PayloadAction<string>) => {
      state.activities = state.activities.filter(activity => activity._id !== action.payload);
    },
  },
});

export const { setActivities, setLoading, setError, addActivity, deleteActivityFromState } = activitiesSlice.actions;
export default activitiesSlice.reducer;
