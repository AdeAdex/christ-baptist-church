"use client";

import { setMember } from "@/app/redux/slices/authSlice";

export async function fetchUser(dispatch: any, token: string | null, enqueueSnackbar: any) {
  if (!token) return;

  try {
    const res = await fetch("/api/auth/dashboard", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    // console.log("User data:", data); // Log the user data for debugging
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
