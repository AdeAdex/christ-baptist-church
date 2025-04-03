// /app/hooks/useAuthToken.ts

import { useState, useEffect } from "react";
import { getAuthToken } from "@/app/actions/getAuthToken";

export function useAuthToken() {
  const [token, setToken] = useState<string | null | "loading">("loading");

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await getAuthToken();
      setToken(storedToken);
    }
    fetchToken();
  }, []);

  return token;
}
