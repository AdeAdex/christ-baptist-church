"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

export const useResetPassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // const queryToken = new URLSearchParams(window.location.search).get("token");
    // setToken(queryToken);


    const searchParams = new URLSearchParams(window.location.search);
    const queryToken = searchParams.get("token");
    const role = searchParams.get("role") || "member"; // Get role

    setToken(queryToken);

    const verifyTokenValidity = async () => {
      if (!queryToken) {
        setMessage("Invalid token");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.post("/api/auth/verify-token", { token: queryToken, role });

        if (response.status === 200) {
          setUsername(response.data.username);
          setSuccess(true);
          setMessage(response.data.message);
          enqueueSnackbar(response.data.message || "Token verified successfully!", {
            variant: "success",
          });
        } else {
          setMessage(response.data.message || "Invalid token");
          enqueueSnackbar(response.data.message || "Invalid token", { variant: "error" });
        }
      } catch (error: unknown) {
        let errorMessage = "Error verifying token";

        if (axios.isAxiosError(error)) {
          errorMessage = error.response?.data?.message || "Server error occurred";
        }

        setMessage(errorMessage);
        enqueueSnackbar(errorMessage, { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    verifyTokenValidity();
  }, [enqueueSnackbar]);

  return { token, loading, message, success, username };
};
