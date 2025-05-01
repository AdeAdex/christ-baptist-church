// /app/hooks/useAuthSync.ts
"use client";

"use client";

import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/slices/authSlice";
import { persistor } from "../redux/store";
import { useCookieAuthToken } from "@/app/hooks/useCookieAuthToken";

const useAuthSync = () => {
  const dispatch = useAppDispatch();
  const { token } = useCookieAuthToken(); // ✅ Correctly destructure token

  useEffect(() => {
    if (token === "loading") return;
    if (!token) {
      dispatch(logout());
      persistor.purge();
    }
  }, [token, dispatch]);
};

export default useAuthSync;

