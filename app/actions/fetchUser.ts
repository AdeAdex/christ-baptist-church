"use client";

import { AppDispatch } from "@/app/redux/store"; // Adjust the path if needed
import { setMember } from "@/app/redux/slices/authSlice";
import { SnackbarKey, VariantType, useSnackbar } from "notistack";

export async function fetchUser(
  dispatch: AppDispatch,
  token: string | null,
  enqueueSnackbar: (message: string, options?: { variant: VariantType }) => SnackbarKey
) {
  if (!token) return;

  try {
    const res = await fetch("/api/auth/dashboard", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    
    if (data.success) {
      dispatch(setMember({ member: data.user, token: data.user.token }));
      enqueueSnackbar(`Welcome back, ${data.user.firstName}!`, { variant: "success" });
    } else {
      console.error("Error fetching user:", data.error);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
