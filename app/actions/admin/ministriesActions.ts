//  /app/actions/admin/ministriesActions.ts

import { setMinistries, setLoading } from "@/app/redux/slices/ministriesSlice";
import { AppDispatch } from "@/app/redux/store";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

// ✅ Fetch ministries
export const fetchMinistries = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading()); // Dispatch setLoading before making the request

    const response = await axios.get<{ ministries: { _id: string; name: string }[] }>(
      "/api/admin/get-all-ministries"
    );


    // Dispatch the ministries to Redux state
    dispatch(setMinistries(response.data.ministries));
  } catch (error: unknown) {
    console.error("Error fetching ministries:", error);
    enqueueSnackbar("Failed to load ministries", { variant: "error" });
  }
};


