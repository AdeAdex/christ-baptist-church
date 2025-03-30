import { useState, useEffect } from "react";
import { getAuthToken } from "@/app/actions/getAuthToken"; // Import server function

export function useAuthToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await getAuthToken();
      setToken(storedToken);
    }
    fetchToken();
  }, []);

  return token;
}
