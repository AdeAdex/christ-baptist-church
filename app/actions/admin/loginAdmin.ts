//  /app/actions/admin/loginAdmin.ts

"use client";

import { signIn } from "next-auth/react";

export const loginAdmin = async (
  email: string,
  password: string,
  enqueueSnackbar: (message: string, options: { variant: "error" | "success" }) => void,
  setSubmitting: (submitting: boolean) => void
) => {
  try {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      isAdminRoute: true,
    });

    if (res?.error) {
      enqueueSnackbar(res.error, { variant: "error" });
      throw new Error(res.error);
    } else {
      enqueueSnackbar("Admin login successful!", { variant: "success" });
    }
  } catch (error) {
    console.error("Admin login error:", error);
    throw error;
  } finally {
    setSubmitting(false);
  }
};
