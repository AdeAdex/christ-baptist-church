// /app/actions/fetchUser.ts

"use client";

import { AppDispatch } from "@/app/redux/store"; // Adjust the path if needed
import { setMember, setLoading } from "@/app/redux/slices/authSlice";

export async function fetchUser(
  dispatch: AppDispatch,
  token: string | null,
) {
  if (!token) return;

  dispatch(setLoading(true));

  try {
    const res = await fetch("/api/auth/dashboard", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    // console.log("User data:", data);

    if (data.success) {
      dispatch(
        setMember({ member: data.user, token: data.token, role: data.role })
      );
    } else {
      console.error("Error fetching user:", data.error);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  } finally {
    // Set loading to false after the API call finishes
    dispatch(setLoading(false));
  }
}
