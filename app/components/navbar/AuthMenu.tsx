"use client";

import { Menu, Avatar } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IoMdLogOut, IoMdPerson, IoMdSpeedometer } from "react-icons/io";
import ThemeToggle from "@/app/components/navbar/ThemeToggle";
import Link from "next/link";
import { logout } from "@/app/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { persistor } from "@/app/redux/store";
import { useSnackbar } from "notistack"; // ✅ Import useSnackbar

const AuthMenu = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar(); // ✅ Initialize Snackbar
  const member = useAppSelector((state) => state.auth.member);

  const handleLogout = async () => {
    try {
      // ✅ Call logout API and extract response JSON
      const res = await fetch("/api/auth/logout", { method: "POST" });
  
      // ✅ Define the expected response type
      interface LogoutResponse {
        message?: string;
      }
  
      let data: LogoutResponse = {};
      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid server response. Please try again.");
      }
  
      // ✅ Check if the API response is OK
      if (!res.ok) {
        throw new LogoutError(data.message || "Failed to logout");
      }
  
      // ✅ Manually clear cookies in the browser (client-side enforcement)
      document.cookie = "authToken=; Max-Age=0; path=/;";
  
      // ✅ Reset Redux state
      dispatch(logout());
  
      // ✅ Wait briefly before purging Redux persist
      setTimeout(async () => {
        await persistor.flush();
        await persistor.purge();
      }, 500);
  
      // ✅ Show API success message
      enqueueSnackbar(data.message || "Logged out successfully", { variant: "success" });
  
      // ✅ Force reload to ensure full state reset
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1000);
    } catch (error: unknown) {
      let errorMessage = "Logout failed. Try again.";
  
      if (error instanceof LogoutError) {
        errorMessage = error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
  
      console.error("Logout failed:", error);
  
      // ✅ Show API error message or fallback error
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };
  
  // ✅ Custom error class for logout errors
  class LogoutError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "LogoutError";
    }
  }
  
  
  
  

  return (
    <div className="flex items-center space-x-4">
      {member ? (
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Avatar
              src={member.profilePicture}
              alt="User Avatar"
              radius="xl"
              className="cursor-pointer"
            />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => router.push("/settings")}>
              <IoMdPerson size={20} className="mr-2 inline-block" />
              Settings
            </Menu.Item>
            <Menu.Item onClick={() => router.push("/dashboard")}>
              <IoMdSpeedometer size={20} className="mr-2 inline-block" />
              Dashboard
            </Menu.Item>
            <Menu.Item onClick={handleLogout} className="text-red-500">
              <IoMdLogOut size={20} className="mr-2 inline-block" />
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ) : (
        <Link
        href="/members/login"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Login
      </Link>
      )}

      {/* Theme Toggle */}
      <ThemeToggle />
    </div>
  );
};

export default AuthMenu;
