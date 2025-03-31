//  /app/actions/admin/ministriesActions.ts

import { setMinistries } from "@/app/redux/slices/ministriesSlice";
import { AppDispatch } from "@/app/redux/store";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

// ✅ Fetch ministries
export const fetchMinistries = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get<{ ministries: string[] }>("/api/admin/get-all-ministries");

    console.log("Fetched ministries:", response.data.ministries); // Log fetched ministries
    dispatch(setMinistries(response.data.ministries));
  } catch (error: unknown) {
    console.error("Error fetching ministries:", error);
    enqueueSnackbar("Failed to load ministries", { variant: "error" });
  }
};

