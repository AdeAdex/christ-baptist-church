
"use client";

import { Burger } from "@mantine/core";
import NotificationIcon from "./notification-icon/NotificationIcon";
import AuthMenu from "../AuthMenu";
import { motion } from "framer-motion"; // Import motion
import { useScreenSize } from "@/app/hooks/useScreenSize"; // Import useScreenSize hook

export default function DashboardNavbar({
  isSidebarOpen,
  toggleSidebar,
  toggleDrawer,
  setLoading,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  toggleDrawer: () => void;
  setLoading: (loading: boolean) => void;
}) {
  const screen = useScreenSize(); // Get the current screen size
  
  return (
    <motion.nav
      className={`fixed z-50 right-0 flex items-center justify-between px-6 py-4 bg-primary-button text-white`}
      initial={{ width: "100%" }} // Initial state width
      animate={{
        // Adjust width dynamically based on screen size and sidebar state
        width: screen === "mobile"
          ? "100%" // On mobile, use full width
          : isSidebarOpen
          ? "calc(100% - 16rem)" // Sidebar open on larger screens
          : "calc(100% - 5rem)", // Sidebar closed on larger screens
      }}
      transition={{ duration: 0.3 }} // Smooth transition duration
    >
      {/* Sidebar/Mobile Drawer Toggle Button */}
      <Burger
        className="md:hidden" // Show only on mobile
        onClick={toggleDrawer}
        aria-label="Toggle mobile navigation"
        color="#fff"
      />
      <Burger
        className="hidden md:block" // Show only on desktop
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        color="#fff"
      />

      {/* Page Title */}
      <h1 className="text-xl font-semibold hidden lg:block">Dashboard</h1>

      {/* Right Side: Profile & Theme Toggle */}
      <div className="flex items-center space-x-4">
        <NotificationIcon />
        <AuthMenu setLoading={setLoading} />
      </div>
    </motion.nav>
  );
}
