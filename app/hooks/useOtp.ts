"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { verifyEmail, resendOtp } from "@/app/actions/members/verifyEmail";

const OTP_LENGTH = Number(process.env.NEXT_PUBLIC_OTP_LENGTH) || 6;
const RESEND_COOLDOWN = Number(process.env.NEXT_PUBLIC_RESEND_COOLDOWN) || 30;


export const useOtp = (email: string, role: string) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [cooldown, setCooldown] = useState(() => {
    // Restore cooldown if user refreshes (optional)
    const savedCooldown = Number(localStorage.getItem("otpCooldown") || "0");
    return savedCooldown > 0 ? savedCooldown : 0;
  });

  const handleVerify = async () => {
    if (otp.length < OTP_LENGTH) {
      enqueueSnackbar("Please enter the complete OTP.", { variant: "warning" });
      return;
    }

    setLoading(true);
    try {
      const response = await verifyEmail({ email, otp, role, router, enqueueSnackbar });

      if (response?.error) {
        enqueueSnackbar(response.error, { variant: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (cooldown > 0) return;

    setResendLoading(true);
    try {
      const response = await resendOtp({ email, role, enqueueSnackbar });

      if (response?.error) {
        enqueueSnackbar(response.error, { variant: "error" });
      } else {
        enqueueSnackbar("A new OTP has been sent to your email.", { variant: "success" });

        // Start the cooldown immediately
        setCooldown(RESEND_COOLDOWN);
        localStorage.setItem("otpCooldown", RESEND_COOLDOWN.toString()); // Save cooldown state
      }
    } finally {
      setResendLoading(false);
    }
  };

  // Cooldown countdown effect
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev > 0) {
            localStorage.setItem("otpCooldown", (prev - 1).toString()); // Update cooldown in local storage
            return prev - 1;
          } else {
            localStorage.removeItem("otpCooldown"); // Cleanup
            clearInterval(timer);
            return 0;
          }
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  return { otp, setOtp, loading, handleVerify, resendLoading, handleResendOtp, cooldown };
};
