// /app/hooks/useCookieAuthToken.ts
"use client";

import { useEffect, useState } from "react";

let cachedToken: string | null = null;

export function useCookieAuthToken() {
  const [token, setToken] = useState<string | null | "loading">("loading");

  const fetchToken = async () => {
    try {
      const res = await fetch("/api/auth/get-auth-token", {
        credentials: "include",
      });
      const data = await res.json();
      cachedToken = data.token;
      setToken(data.token);
    } catch (error) {
      console.error("Token fetch failed", error);
      cachedToken = null;
      setToken(null);
    }
  };

  useEffect(() => {
    if (cachedToken !== null) {
      setToken(cachedToken);
    } else {
      fetchToken();
    }
  }, []);

  return { token };
}

