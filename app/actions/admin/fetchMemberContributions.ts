"use client";

import axios from "axios";
import { Contribution } from "@/app/types/contribution";

export const fetchMemberContributionsAction = async (
  memberId: string
): Promise<{ contributions: Contribution[]; message: string }> => {
  try {
    const response = await axios.post("/api/admin/get-member-contribution", {
      memberId,
    });
    console.log("Fetch Contributions Response:", response.data.contributions);
    return {
      contributions: response.data.contributions,
      message: response.data.message || "Contributions fetched successfully",
    };
  } catch (error: any) {
    console.error("Fetch Contributions Error:", error);

    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    if (error instanceof Error && error.message) {
      throw new Error(error.message);
    }

    throw new Error("Unknown error occurred while fetching contributions.");
  }
};
