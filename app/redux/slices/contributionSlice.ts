//  /app/redux/slices/contributionSlice.ts




import { Contribution } from "@/app/types/contribution";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ContributionState {
  isLoading: boolean;
  message: string;
  error: string;
  contributions: Contribution[];  // Store contributions fetched from the server
}

const initialState: ContributionState = {
  isLoading: false,
  message: "",
  error: "",
  contributions: [],  // Initialize with an empty array for fetched contributions
};

const contributionSlice = createSlice({
  name: "contribution",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
      state.message = "";
      state.error = "";
    },
    setSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.message = action.payload;
      state.error = "";
    },
    setError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.message = "";
    },
    setContributions: (state, action: PayloadAction<Contribution[]>) => {
      state.isLoading = false;
      state.contributions = action.payload; // Store the fetched contributions
    },
    addNewContribution: (state, action: PayloadAction<Contribution>) => {
      state.contributions.push(action.payload); // Add new contribution to the list
    },
  },
});

export const { setLoading, setSuccess, setError, setContributions, addNewContribution } = contributionSlice.actions;
export default contributionSlice.reducer;
