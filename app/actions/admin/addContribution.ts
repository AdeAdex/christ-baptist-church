//  /app/actions/admin/addContribution.ts

// "use server";

import { Contribution } from "@/app/types/contribution";
import axios from "axios";


export const addContributionAction = async (data: Contribution) => {
  try {
    const response = await axios.post(
      "/api/admin/add-member-contribution",
      data
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Add Contribution Error:", error);

    // Handle the server-side error response
    if (error instanceof Error && error.message) {
      throw new Error(error.message); // Propagate the message from the server
    }

    // Default message if the error is not from the server
    throw new Error("Unknown error occurred");
  }
};
