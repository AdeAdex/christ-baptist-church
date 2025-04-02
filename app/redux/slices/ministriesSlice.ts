// /app/redux/slices/ministriesSlice.ts


import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of a ministry object
interface Ministry {
  _id: string;
  name: string;
}

interface MinistriesState {
  ministries: Ministry[]; // Store an array of ministry objects
  isLoading: boolean; // Track the loading state
}

const initialState: MinistriesState = {
  ministries: [],
  isLoading: false,
};

const ministriesSlice = createSlice({
  name: "ministries",
  initialState,
  reducers: {
    setMinistries: (state, action: PayloadAction<Ministry[]>) => {
      state.ministries = action.payload;
      state.isLoading = false; // Set loading to false when ministries are fetched
    },
    setLoading: (state) => {
      state.isLoading = true; // Set loading to true when fetching ministries
    },
  },
});

export const { setMinistries, setLoading } = ministriesSlice.actions;
export default ministriesSlice.reducer;
