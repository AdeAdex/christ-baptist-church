"use client";

import { logout } from "@/app/redux/slices/authSlice";
import { persistor } from "@/app/redux/store";
import { AppDispatch } from "@/app/redux/store";
import { useRouter } from "next/navigation";

export const handleLogout = async (
  dispatch: AppDispatch,
  router: ReturnType<typeof useRouter>,
  enqueueSnackbar: (message: string, options: { variant: "error" | "success" }) => void,
) => {
  try {
    // ✅ Call logout API
    const res = await fetch("/api/auth/logout", { method: "POST" });

    // ✅ Define the expected response type
    interface LogoutResponse {
      message?: string;
    }

    let data: LogoutResponse = {};
    try {
      data = await res.json();
    } catch {
      throw new Error("Invalid server response. Please try again.");
    }

    // ✅ Check API response
    if (!res.ok) {
      throw new LogoutError(data.message || "Failed to logout");
    }

    // ✅ Manually clear authToken cookie
    document.cookie = "authToken=; Max-Age=0; path=/;";

    // ✅ Reset Redux state
    dispatch(logout());

    // ✅ Purge Redux persist after a short delay
    setTimeout(async () => {
      await persistor.flush();
      await persistor.purge();
    }, 500);

    // ✅ Show success message
    enqueueSnackbar(data.message || "Logged out successfully", { variant: "success" });

    // ✅ Redirect and refresh
    setTimeout(() => {
      router.push("/");
      router.refresh();
    }, 1000);
  } catch (error: unknown) {
    let errorMessage = "Logout failed. Try again.";

    if (error instanceof LogoutError) {
      errorMessage = error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("Logout failed:", error);
    enqueueSnackbar(errorMessage, { variant: "error" });
  }
};

// ✅ Custom error class
class LogoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LogoutError";
  }
}
