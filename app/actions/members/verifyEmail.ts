"use client";

import { useRouter } from "next/navigation";

interface VerifyEmailResponse {
  success?: boolean;
  error?: string;
  message?: string;
}

export const verifyEmail = async ({
  email,
  otp,
  role,
  router,
  enqueueSnackbar,
}: {
  email: string;
  otp: string;
  role: string;
  router: ReturnType<typeof useRouter>;
  enqueueSnackbar: (message: string, options?: { variant: "success" | "error" | "warning" }) => void;
}): Promise<VerifyEmailResponse> => {
  try {
    const res = await fetch("/api/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, role }),
    });

    const data: VerifyEmailResponse = await res.json();

    if (res.ok && data.success) {
      enqueueSnackbar(data.message || "Email verified successfully!", { variant: "success" });
      setTimeout(() => router.push(`/${role}/login`), 2000);
    } else {
      enqueueSnackbar(data.error || "Verification failed", { variant: "error" });
    }

    return data;
  } catch (error: unknown) {
    const errorMessage = (error as Error).message || "An unexpected error occurred";
    enqueueSnackbar(errorMessage, { variant: "error" });
    return { error: errorMessage };
  }
};





interface ResendOtpResponse {
  success?: boolean;
  error?: string;
  message?: string;
}

export const resendOtp = async ({
  email,
  role,
  enqueueSnackbar,
}: {
  email: string;
  role: string;
  enqueueSnackbar: (message: string, options?: { variant: "success" | "error" | "warning" }) => void;
}): Promise<ResendOtpResponse> => {
  try {
    const res = await fetch("/api/auth/resend-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role }),
    });

    const data: ResendOtpResponse = await res.json();

    if (res.ok && data.success) {
      enqueueSnackbar(data.message || "OTP resent successfully!", { variant: "success" });
    } else {
      enqueueSnackbar(data.error || "Failed to resend OTP", { variant: "error" });
    }

    return data;
  } catch (error: unknown) {
    const errorMessage = (error as Error).message || "An unexpected error occurred";
    enqueueSnackbar(errorMessage, { variant: "error" });
    return { error: errorMessage };
  }
};
