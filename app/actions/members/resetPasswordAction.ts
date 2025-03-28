"use client";

import axios from "axios";

export const resetPasswordAction = async (token: string | null, password: string, role: string) => {
  if (!token) {
    return { error: "Invalid or missing token" };
  }

  try {
    const response = await axios.post("/api/auth/reset-password", { token, password, role });

    if (response.status === 200) {
      return { success: response.data.message };
    } else {
      return { error: response.data.error || "Failed to reset password" };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.error || "Internal server error" };
    }
    return { error: "An unexpected error occurred" };
  }
};
