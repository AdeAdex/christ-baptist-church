// /app/hooks/useAuthSync.ts


import { useEffect } from "react";
import { getCookie } from "typescript-cookie";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/slices/authSlice";
import { persistor } from "../redux/store";

const useAuthSync = () => {
  const dispatch = useAppDispatch();
  const authToken = useAppSelector((state) => state.auth.token);
  const cookieToken = getCookie("authToken");

  useEffect(() => {
    // If no token in state or cookie, clear auth
    if (!authToken && !cookieToken) {
      dispatch(logout());
      persistor.purge();
    }
  }, [authToken, cookieToken, dispatch]);
};

export default useAuthSync;
